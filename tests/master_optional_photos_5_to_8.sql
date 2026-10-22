-- Run after applying the migration. Test image writes are rolled back.
begin;

DO $gallery_tests$
DECLARE p jsonb; name0 text; g jsonb; e jsonb; before_count bigint; after_count bigint;
BEGIN
  select name into strict name0 from public.catalog_products where sku='AFL-000130';
  select count(*) into before_count from public.catalog_products;
  p := jsonb_build_object('sku','AFL-000130','name',name0,'image','https://example.test/1.jpg','image_2','https://example.test/2.jpg','image_3','https://example.test/3.jpg','image_4','https://example.test/4.jpg',
    'image_5',' https://example.test/5.jpg ','image_6','https://example.test/6.jpg','image_7','https://example.test/7.jpg','image_8','https://example.test/8.jpg');
  perform public.import_master_products(jsonb_build_array(p));
  select gallery,master_extra_images into g,e from public.catalog_products where sku='AFL-000130';
  if jsonb_array_length(g)<>8 or jsonb_array_length(e)<>4 or g->>4<>'https://example.test/5.jpg' or g->>7<>'https://example.test/8.jpg' then raise exception 'Eight-photo import failed'; end if;
  perform public.import_master_products(jsonb_build_array(p-'image_5'-'image_6'-'image_7'-'image_8'));
  select gallery into g from public.catalog_products where sku='AFL-000130';
  if jsonb_array_length(g)<>8 then raise exception 'Legacy payload erased new photos'; end if;
  p := p||jsonb_build_object('image_5','','image_6','','image_7','','image_8','');
  perform public.import_master_products(jsonb_build_array(p));
  select gallery,master_extra_images into g,e from public.catalog_products where sku='AFL-000130';
  if jsonb_array_length(g)<>4 or e<>'[]'::jsonb then raise exception 'Clearing optional photos failed'; end if;
  p := p||jsonb_build_object('image_8','https://example.test/8.jpg');
  perform public.import_master_products(jsonb_build_array(p));
  select gallery,master_extra_images into g,e from public.catalog_products where sku='AFL-000130';
  if jsonb_array_length(g)<>5 or e<>'["https://example.test/8.jpg"]'::jsonb then raise exception 'Blank intermediate columns failed'; end if;
  perform public.import_master_products(jsonb_build_array(jsonb_build_object('sku','AFL-000130','name',name0,'image_5','','image_6','','image_7','','image_8','https://example.test/new8.jpg')));
  select gallery into g from public.catalog_products where sku='AFL-000130';
  if jsonb_array_length(g)<>5 or g->>1<>'https://example.test/2.jpg' or g->>4<>'https://example.test/new8.jpg' then raise exception 'Partial extra update lost original photos'; end if;
  select count(*) into after_count from public.catalog_products;
  if before_count<>after_count then raise exception 'Product count changed'; end if;
  if has_function_privilege('anon','public.import_master_products(jsonb)','EXECUTE') then raise exception 'Import permissions changed'; end if;
END $gallery_tests$;

rollback;
