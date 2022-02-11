exports.pesquisaIdade = `SELECT label,
coalesce(SUM(qtd_grupo1), 0) qtd_grupo1,
coalesce(SUM(qtd_grupo2), 0) qtd_grupo2,
coalesce(SUM(qtd_grupo3), 0) qtd_grupo3,
coalesce(SUM(qtd_grupo4), 0) qtd_grupo4,
coalesce(SUM(qtd_grupo5), 0) qtd_grupo5,
'225,225,225' rgb
FROM (SELECT label,
        (case
          when idade between 18 and 25 then
           qtd
        end) qtd_grupo1,
        (case
          when idade between 26 and 35 then
           qtd
        end) qtd_grupo2,
        (case
          when idade between 36 and 45 then
           qtd
        end) qtd_grupo3,
        (case
          when idade between 46 and 60 then
           qtd
        end) qtd_grupo4,
        (case
          when idade > 60 then
           qtd
        end) qtd_grupo5
   FROM (SELECT DATE_FORMAT(pecl_data, '%Y/%m') 'label',
                YEAR(FROM_DAYS(TO_DAYS(NOW()) - TO_DAYS(cli_dat_nasc))) idade,
                COUNT(DISTINCT CONCAT(pc.pesq_cod, c.cli_cod)) qtd
           FROM pesquisa_cliente pc, cliente c
          WHERE pc.cli_cod = c.cli_cod
           /* and pecl_data >= date_add(DATE_ADD(LAST_DAY(:DATA_INICIAL), interval 1 DAY),
                                      interval - 13 Month)*/
           and pc.pesq_cod = ?
          GROUP BY DATE_FORMAT(pecl_data, '%Y/%m'),
                   YEAR(FROM_DAYS(TO_DAYS(NOW()) - TO_DAYS(cli_dat_nasc)))) a) a
GROUP BY label
order by str_to_Date(concat(label, '/01'), '%Y/%m/%d') 
limit 12
`