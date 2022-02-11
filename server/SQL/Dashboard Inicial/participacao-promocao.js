exports.participacaoPromo = `select periodo as label,
venda_promo,
venda_total,
(case
  when (venda_promo > 0) and (venda_total > 0) then
   round((venda_promo / venda_total)*100, 0)
  else
   0
end) part_promo
from (select date_format(c.clcp_data_compra, '%Y/%m') periodo,
        sum(c.clcp_val_cupom) venda_total,
        (select sum(c1.clcp_val_cupom)
           from cliente_cupom c1
          where c1.cli_cod is not null
            and date_format(c1.clcp_data_compra, '%Y/%m') =
                date_format(c.clcp_data_compra, '%Y/%m')) venda_promo
   from cliente_cupom c
  where c.clcp_data_compra >=
        date_add(DATE_ADD(LAST_DAY(current_date), interval 1 DAY), interval - 23 Month)
  group by date_format(c.clcp_data_compra, '%Y/%m')) a
`