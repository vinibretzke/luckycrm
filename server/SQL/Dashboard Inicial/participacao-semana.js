
exports.participacaoSemana = `select descr label, venda_promo, venda, coalesce(promo,0) promo
from (select dia as label,
			venda_promo ,
			venda,
             (case
               when (venda_promo > 0) and (venda > 0) then
                round((venda_promo / (venda)*100), 0)
               else
                0
             end) promo
        from (select DAYOFWEEK(c.clcp_data_compra) dia,
                     coalesce(sum(c.clcp_val_cupom), 0) venda,
                     coalesce((select sum(c1.clcp_val_cupom)
                                from cliente_cupom c1
                               where c1.cli_cod is not null 
                 and c1.clcp_data_compra between '2020-10-01' and '2020-10-30'
                                 and DAYOFWEEK(c1.clcp_data_compra) = DAYOFWEEK(c.clcp_data_compra)),
                              0) venda_promo
                from cliente_cupom c
               where c.clcp_data_compra between '2020-10-01' and '2020-10-30'
               group by DAYOFWEEK(c.clcp_data_compra)) a) a
right join (select 1 dia,
                  'Domingo' descr union select 2,
                  'Segunda' union select 3,
                  'Terça' union select 4,
                  'Quarta' union select 5,
                  'Quinta' union select 6,
                  'Sexta' union select 7,
                  'Sábado') b
  on label = dia

`