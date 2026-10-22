# Fotos opcionais 5 a 8 — Planilha Mestre AFLarte

A aba `CADASTRO MESTRE AFLARTE` mantém todas as colunas A:AB nas posições atuais.

| Coluna | Campo | Chave enviada |
| --- | --- | --- |
| AC | Foto 5 | image_5 |
| AD | Foto 6 | image_6 |
| AE | Foto 7 | image_7 |
| AF | Foto 8 | image_8 |

## Ajuste do Apps Script vinculado

Nas capturas do código atual, a função `sincronizarProdutosAFLarte` lê 28 colunas. Troque a leitura por:

```js
// A:AF — cadastro mestre, fotos, vídeos e controles do site
const values = sheet.getRange(4, 1, lastRow - 3, 32).getValues();
```

Preserve todas as outras opções da leitura e do processamento.

No mesmo objeto de produto que já envia `image_2`, `image_3` e `image_4`, acrescente:

```js
image_5: String(r[28] || '').trim(),
image_6: String(r[29] || '').trim(),
image_7: String(r[30] || '').trim(),
image_8: String(r[31] || '').trim(),
```

Nas capturas verificadas, a variável da linha é `r`. Ao acrescentar as chaves depois de `sensory_catalog_video`, inclua uma vírgula no final dessa propriedade existente. Mantenha o segredo da integração, os acionadores, os vídeos (W e AB), destaques (X:Y), ativo no site (Z) e catálogo sensorial (AA) como estão. Se houver uma proteção de intervalo no acionador, inclua AC:AF na faixa observada.

As quatro chaves devem ser enviadas mesmo vazias: vazio limpa a foto opcional; chave ausente mantém as fotos opcionais já salvas, para compatibilidade com clientes antigos.

### Ordenação dos produtos

A função atual `ordenarProdutosAflarte` também limita seu intervalo a 28 colunas. Troque apenas o último argumento do `aba.getRange` de `28` para `32`:

```js
const intervalo = aba.getRange(
  primeiraLinha,
  1,
  ultimaLinha - primeiraLinha + 1,
  32
);
```

Esse ajuste faz as fotos de AC:AF acompanharem o produto quando a planilha é ordenada. Preserve `intervalo.sort({ column: 1, ascending: true });`.

Salve o projeto e execute `sincronizarProdutosAFLarte` (a função de configuração da integração não é necessária para essa alteração).

## Backend e site

A migração `master_optional_photos_5_to_8_compatible` amplia o importador existente. As fotos opcionais são armazenadas em `master_extra_images` e combinadas com a galeria existente. O importador continua restrito a `service_role`. A API e o site já percorrem a galeria completa, sem limite de quatro fotos.

## Verificação

O teste SQL cobre oito fotos, colunas intermediárias vazias, remoção das fotos opcionais, edição parcial e preservação das fotos 5–8 quando um cliente antigo envia apenas 1–4. Os testes são executados numa transação com rollback, sem publicar imagens de teste.

## Estado em 22/10/2026

Colunas AC:AF criadas e backend preparado. O código atual foi conferido nas cinco capturas fornecidas pelo proprietário; os ajustes de leitura, envio e ordenação ainda precisam ser aplicados no editor dele, pois a sessão remota Google não foi autenticada. Não considerar a integração completa antes de uma nova foto preenchida em AC:AF chegar à API pública após a execução do sincronizador.
