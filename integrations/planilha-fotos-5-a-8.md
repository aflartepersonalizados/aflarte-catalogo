# Fotos opcionais 5 a 8 — Planilha Mestre AFLarte

A aba `CADASTRO MESTRE AFLARTE` mantém todas as colunas A:AB nas posições atuais.

| Coluna | Campo | Chave enviada |
| --- | --- | --- |
| AC | Foto 5 | image_5 |
| AD | Foto 6 | image_6 |
| AE | Foto 7 | image_7 |
| AF | Foto 8 | image_8 |

## Ajuste do Apps Script vinculado

No código existente de `sincronizarProdutosAFLarte`, amplie o intervalo de leitura de 28 para 32 colunas (A:AF). Preserve a linha inicial, a quantidade de linhas e todas as outras opções da leitura atual.

No mesmo objeto de produto que já envia `image_2`, `image_3` e `image_4`, acrescente:

```js
image_5: String(r[28] || '').trim(),
image_6: String(r[29] || '').trim(),
image_7: String(r[30] || '').trim(),
image_8: String(r[31] || '').trim(),
```

Use o nome real da variável da linha; `r` é o nome usado no código anteriormente fornecido. Mantenha o segredo da integração, os acionadores, os vídeos (W e AB), destaques (X:Y), ativo no site (Z) e catálogo sensorial (AA) como estão. Se houver uma proteção de intervalo no acionador, inclua AC:AF na faixa observada.

As quatro chaves devem ser enviadas mesmo vazias: vazio limpa a foto opcional; chave ausente mantém as fotos opcionais já salvas, para compatibilidade com clientes antigos.

## Backend e site

A migração `master_optional_photos_5_to_8_compatible` amplia o importador existente. As fotos opcionais são armazenadas em `master_extra_images` e combinadas com a galeria existente. O importador continua restrito a `service_role`. A API e o site já percorrem a galeria completa, sem limite de quatro fotos.

## Verificação

O teste SQL cobre oito fotos, colunas intermediárias vazias, remoção das fotos opcionais, edição parcial e preservação das fotos 5–8 quando um cliente antigo envia apenas 1–4. Os testes são executados numa transação com rollback, sem publicar imagens de teste.

## Estado em 22/10/2026

Colunas AC:AF criadas e backend preparado. A edição e a verificação do Apps Script vinculado dependem de acesso à sessão Google do proprietário. Não considerar a integração completa antes de uma nova foto preenchida em AC:AF chegar à API pública após a execução do sincronizador.
