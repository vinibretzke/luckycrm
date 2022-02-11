exports.clientesPromocao = `select c.cli_cod,
c.cli_nome,
coalesce(concat_ws('',c.cli_ender,', ', c.cli_ender_num),'NI') ender,
coalesce(c.cli_bairro,'NI') bairro,
coalesce(c.cli_telefone,'NI') telefone,
coalesce(c.cli_celular,'NI') celular,
count(clcp.clcp_id_cupom) cupons,
sum(clcp.clcp_val_total) valor
from cliente c, cliente_cupom clcp
where c.cli_cod = clcp.cli_cod
and clcp.clcp_data_compra between '2020-10-01' and '2020-10-30'
and c.cli_aceita_contato = 'S'
group by c.cli_cod,
   c.cli_nome,
   coalesce(concat_ws('',c.cli_ender,', ', c.cli_ender_num),'NI'),
   coalesce(c.cli_bairro,'NI'),
   coalesce(c.cli_telefone,'NI'),
   coalesce(c.cli_celular,'NI')
order by valor desc 
limit 20
`