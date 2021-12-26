
exports.dashboard1 = `select coalesce(sum(vd_grupo1), 0) vd_grupo1,
       coalesce(sum(vd_grupo2), 0) vd_grupo2,
       coalesce(sum(vd_grupo3), 0) vd_grupo3,
       coalesce(sum(vd_grupo4), 0) vd_grupo4,
       coalesce(sum(vd_grupo5), 0) vd_grupo5,
       coalesce(sum(vd_grupo1), 0)+coalesce(sum(vd_grupo2), 0)+coalesce(sum(vd_grupo3), 0)+coalesce(sum(vd_grupo4), 0)+coalesce(sum(vd_grupo5), 0) vd_total,
       
       coalesce(sum(cp_grupo1), 0) cp_grupo1,
       coalesce(sum(cp_grupo2), 0) cp_grupo2,
       coalesce(sum(cp_grupo3), 0) cp_grupo3,
       coalesce(sum(cp_grupo4), 0) cp_grupo4,
       coalesce(sum(cp_grupo5), 0) cp_grupo5,
       coalesce(sum(cp_grupo1), 0)+coalesce(sum(cp_grupo2), 0)+coalesce(sum(cp_grupo3), 0)+coalesce(sum(cp_grupo4), 0)+coalesce(sum(cp_grupo5), 0) cp_total
  from (select case
                 when idade between 18 and 25 then
                  cupons
               end cp_grupo1,
               case
                 when idade between 26 and 35 then
                  cupons
               end cp_grupo2,
               case
                 when idade between 36 and 45 then
                  cupons
               end cp_grupo3,
               case
                 when idade between 46 and 60 then
                  cupons
               end cp_grupo4,
               case
                 when idade > 60 then
                  cupons
               end cp_grupo5,
               
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
          from (select year(FROM_DAYS(TO_DAYS(NOW()) - TO_DAYS(cli_dat_nasc))) idade,
                       sum(clcp_val_total) valor,
                       count(clcp_val_total) cupons
                  from cliente c, cliente_cupom cc
                 where c.cli_cod = cc.cli_cod
                   and clcp_data_compra between '2020-10-01' and '2020-10-30'
                 group by year(FROM_DAYS(TO_DAYS(NOW()) - TO_DAYS(cli_dat_nasc)))) a) a`