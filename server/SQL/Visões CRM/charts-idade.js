exports.idadeUnidade = `select unid_cod as label,
'25' as rgb,
coalesce(sum(vd_grupo1), 0) vd_grupo1,
coalesce(sum(vd_grupo2), 0) vd_grupo2,
coalesce(sum(vd_grupo3), 0) vd_grupo3,
coalesce(sum(vd_grupo4), 0) vd_grupo4,
coalesce(sum(vd_grupo5), 0) vd_grupo5
from (select unid_cod,
        case
          when idade between 18 and 25 then
           valor
        end vd_grupo1,
        case
          when idade between 26 and 35 then
           valor
        end vd_grupo2,
        case
          when idade between 36 and 45 then
           valor
        end vd_grupo3,
        case
          when idade between 46 and 60 then
           valor
        end vd_grupo4,
        case
          when idade > 60 then
           valor
        end vd_grupo5
   from (select cc.unid_cod,
                YEAR(FROM_DAYS(TO_DAYS(NOW()) - TO_DAYS(cli_dat_nasc))) idade,
                sum(clcp_val_total) valor
           from cliente c, cliente_cupom cc
          where c.cli_cod = cc.cli_cod
          and cc.unid_cod not in (8)
    and clcp_data_compra between '2020-10-01' and '2020-10-30'
          group by cc.unid_cod, YEAR(FROM_DAYS(TO_DAYS(NOW()) - TO_DAYS(cli_dat_nasc)))) a) a
group by unid_cod
`


exports.idadeDiaSemana = `select descr label, 
coalesce(vd_grupo1,0) vd_grupo1,
coalesce(vd_grupo2,0) vd_grupo2,
coalesce(vd_grupo3,0) vd_grupo3,
coalesce(vd_grupo4,0) vd_grupo4,
coalesce(vd_grupo5,0) vd_grupo5
from (select dia,
        '25' as rgb,
        coalesce(sum(vd_grupo1), 0) vd_grupo1,
        coalesce(sum(vd_grupo2), 0) vd_grupo2,
        coalesce(sum(vd_grupo3), 0) vd_grupo3,
        coalesce(sum(vd_grupo4), 0) vd_grupo4,
        coalesce(sum(vd_grupo5), 0) vd_grupo5
   from (select dia,
                case
                  when idade between 18 and 25 then
                   valor
                end vd_grupo1,
                case
                  when idade between 26 and 35 then
                   valor
                end vd_grupo2,
                case
                  when idade between 36 and 45 then
                   valor
                end vd_grupo3,
                case
                  when idade between 46 and 60 then
                   valor
                end vd_grupo4,
                case
                  when idade > 60 then
                   valor
                end vd_grupo5
           from (select DAYOFWEEK(cc.clcp_data_compra) dia,
                        YEAR(FROM_DAYS(TO_DAYS(NOW()) - TO_DAYS(cli_dat_nasc))) idade,
                        sum(clcp_val_total) valor
                   from cliente c, cliente_cupom cc
                  where c.cli_cod = cc.cli_cod
                    and clcp_data_compra between '2020-10-01' and '2020-10-30'
                  group by DAYOFWEEK(cc.clcp_data_compra),
                           YEAR(FROM_DAYS(TO_DAYS(NOW()) - TO_DAYS(cli_dat_nasc)))) a) a
  group by dia) a
right join (select 1 dia,
             'Domingo' descr union select 2,
             'Segunda' union select 3,
             'Terça' union select 4,
             'Quarta' union select 5,
             'Quinta' union select 6,
             'Sexta' union select 7,
             'Sábado') b
on a.dia = b.dia
`

exports.partipacaoIdade = `select periodo as label,
vd_grupo1 / vGeral vd_grupo1,
vd_grupo2 / vGeral vd_grupo2,
vd_grupo3 / vGeral vd_grupo3,
vd_grupo4 / vGeral vd_grupo4,
vd_grupo5 / vGeral vd_grupo5
from (select periodo,
        coalesce(sum(vd_grupo1), 0) vd_grupo1,
        coalesce(sum(vd_grupo2), 0) vd_grupo2,
        coalesce(sum(vd_grupo3), 0) vd_grupo3,
        coalesce(sum(vd_grupo4), 0) vd_grupo4,
        coalesce(sum(vd_grupo5), 0) vd_grupo5,
        coalesce(sum(vd_grupo1), 0)+coalesce(sum(vd_grupo2), 0)+coalesce(sum(vd_grupo3), 0)+coalesce(sum(vd_grupo4), 0)+coalesce(sum(vd_grupo5), 0) vGeral
   from (select periodo,
                case
                  when idade between 18 and 25 then
                   valor
                end vd_grupo1,
                case
                  when idade between 26 and 35 then
                   valor
                end vd_grupo2,
                case
                  when idade between 36 and 45 then
                   valor
                end vd_grupo3,
                case
                  when idade between 46 and 60 then
                   valor
                end vd_grupo4,
                case
                  when idade > 60 then
                   valor
                end vd_grupo5
           from (select date_format(clcp_data_compra, '%Y/%m') periodo,
                        year(FROM_DAYS(TO_DAYS(NOW()) - TO_DAYS(cli_dat_nasc))) idade,
                        sum(clcp_val_total) valor
                   from cliente c, cliente_cupom cc
                  where c.cli_cod = cc.cli_cod
                    and clcp_data_compra >=
                        date_add(DATE_ADD(LAST_DAY(current_date), interval 1 DAY),
                                 interval - 23 Month)
                  group by date_format(clcp_data_compra, '%Y/%m'),
                           year(FROM_DAYS(TO_DAYS(NOW()) - TO_DAYS(cli_dat_nasc)))) a) a
  group by periodo) a`