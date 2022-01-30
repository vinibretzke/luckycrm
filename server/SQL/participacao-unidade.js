
exports.participacaoUnidade = `select unid_cod as label,
(case
  when (venda_promo > 0) and (venda > 0) then
   round((venda_promo / (venda)), 4)
  else
   0
end) promo,
(case
  when (venda_promo > 0) and (venda > 0) then
   round(1 - ((venda_promo / (venda))), 4)
  when (venda > 0) and (venda_promo = 0) then
   1
  else
   0
end) geral,
'25' rgb
from (select c.unid_cod,
        coalesce(sum(c.clcp_val_cupom), 0) venda,
        coalesce((select sum(c1.clcp_val_cupom)
                   from cliente_cupom c1
                  where c1.cli_cod is not null
                    and c1.clcp_data_compra between '2020-10-01' and '2020-10-30'
                    and c1.unid_cod = c.unid_cod),
                 0) venda_promo
   from cliente_cupom c
  where c.clcp_data_compra between '2020-10-01' and '2020-10-30'
  group by c.unid_cod) a
`