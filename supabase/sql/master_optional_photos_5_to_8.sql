-- Optional master-sheet photos AC:AF (photos 5 to 8).
-- Existing A:AB layout and all importer grants are preserved.
-- This patch reads the existing function, so deployment-specific IDs stay in the database.
alter table public.catalog_products add column if not exists master_extra_images jsonb not null default '[]'::jsonb;
comment on column public.catalog_products.master_extra_images is 'Optional master-sheet photos 5 to 8; retained when a legacy client sends only photos 1 to 4.';
DO $patch$
declare definition text; old_fragment text; new_fragment text;
begin
  definition := pg_get_functiondef('public.import_master_products(jsonb)'::regprocedure);
  if strpos(definition,'master_extra_images')>0 then return; end if;
  old_fragment := $old_0$catlabel text; catkey text; img text; img2 text; img3 text; img4 text; vid text;$old_0$;
  new_fragment := $new_0$catlabel text; catkey text; img text; img2 text; img3 text; img4 text; vid text;
 extra_imgs jsonb; stored_extra_imgs jsonb; has_extra_photos boolean;$new_0$;
  if length(definition)-length(replace(definition,old_fragment,'')) <> length(old_fragment) then
    raise exception 'Import definition changed at patch 1; inspect before applying';
  end if;
  definition := replace(definition,old_fragment,new_fragment);
  old_fragment := $old_1$  select id into siteid from catalog_products where sku=psku limit 1;$old_1$;
  new_fragment := $new_1$  has_extra_photos := x ?| array['image_5','image_6','image_7','image_8'];
  select coalesce(jsonb_agg(v order by ord) filter (where v is not null),'[]'::jsonb)
    into extra_imgs
    from (values (5,nullif(trim(x->>'image_5'),'')),(6,nullif(trim(x->>'image_6'),'')),
                 (7,nullif(trim(x->>'image_7'),'')),(8,nullif(trim(x->>'image_8'),''))) t(ord,v);
  stored_extra_imgs := null;
  select id,master_extra_images into siteid,stored_extra_imgs from catalog_products where sku=psku limit 1;
  if not has_extra_photos then extra_imgs := coalesce(stored_extra_imgs,'[]'::jsonb); end if;$new_1$;
  if length(definition)-length(replace(definition,old_fragment,'')) <> length(old_fragment) then
    raise exception 'Import definition changed at patch 2; inspect before applying';
  end if;
  definition := replace(definition,old_fragment,new_fragment);
  old_fragment := $old_2$main_image,gallery,video_url,short_description$old_2$;
  new_fragment := $new_2$main_image,gallery,master_extra_images,video_url,short_description$new_2$;
  if length(definition)-length(replace(definition,old_fragment,'')) <> length(old_fragment) then
    raise exception 'Import definition changed at patch 3; inspect before applying';
  end if;
  definition := replace(definition,old_fragment,new_fragment);
  old_fragment := $old_3$public.aflarte_media_gallery(img,img2,img3,img4),vid,$old_3$;
  new_fragment := $new_3$public.aflarte_media_gallery(img,img2,img3,img4)||extra_imgs,extra_imgs,vid,$new_3$;
  if length(definition)-length(replace(definition,old_fragment,'')) <> length(old_fragment) then
    raise exception 'Import definition changed at patch 4; inspect before applying';
  end if;
  definition := replace(definition,old_fragment,new_fragment);
  old_fragment := $old_4$gallery=case when img is not null or img2 is not null or img3 is not null or img4 is not null then public.aflarte_media_gallery(coalesce(img,main_image),img2,img3,img4) else gallery end,video_url=coalesce(vid,video_url),$old_4$;
  new_fragment := $new_4$gallery=case
        when img is not null or img2 is not null or img3 is not null or img4 is not null
          then public.aflarte_media_gallery(coalesce(img,main_image),img2,img3,img4)||extra_imgs
        when has_extra_photos then
          (select coalesce(jsonb_agg(value order by ordinality),'[]'::jsonb)
             from jsonb_array_elements(coalesce(gallery,'[]'::jsonb)) with ordinality t(value,ordinality)
             where ordinality <= jsonb_array_length(coalesce(gallery,'[]'::jsonb))-jsonb_array_length(coalesce(stored_extra_imgs,'[]'::jsonb)))||extra_imgs
        else gallery end,
      master_extra_images=extra_imgs,video_url=coalesce(vid,video_url),$new_4$;
  if length(definition)-length(replace(definition,old_fragment,'')) <> length(old_fragment) then
    raise exception 'Import definition changed at patch 5; inspect before applying';
  end if;
  definition := replace(definition,old_fragment,new_fragment);
  execute definition;
end $patch$;
