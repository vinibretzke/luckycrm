
exports.participacaoUnidade = `select unid_cod as label,
venda_promo ,
venda,
(case
  when (venda_promo > 0) and (venda > 0) then
   round((venda_promo / (venda)), 4)
  else
   0
end) promo
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
  and c.unid_cod not in (8)
  group by c.unid_cod) a
`