exports.cardsGenero = `select coalesce(sum(venda_homem), 0) venda_homem,
coalesce(sum(cupons_homem), 0) cupons_homem,
coalesce(sum(venda_mulher), 0) venda_mulher,
coalesce(sum(cupons_mulher), 0) cupons_mulher,
coalesce(sum(venda_outros), 0) venda_outros,
coalesce(sum(cupons_outros), 0) cupons_outros,
coalesce(sum(venda_homem), 0) + coalesce(sum(venda_mulher), 0) + coalesce(sum(venda_outros), 0) venda_total,
coalesce(sum(cupons_homem), 0)+coalesce(sum(cupons_mulher), 0)+coalesce(sum(cupons_outros), 0) cupons_total

from (select case
          when sexo = 'M' then
           venda
        end venda_homem,
        case
          when sexo = 'M' then
           cupons
        end cupons_homem,
        
        case
          when sexo = 'F' then
           venda
        end venda_mulher,
        case
          when sexo = 'F' then
           cupons
        end cupons_mulher,
        
        case
          when sexo = 'O' then
           venda
        end venda_outros,
        case
          when sexo = 'O' then
           cupons
        end cupons_outros
   from (select coalesce(c.cli_flg_sexo, 'O') sexo,
                sum(clcp_val_total) venda,
                count(clcp_val_total) cupons
           from cliente c, cliente_cupom cc
          where cc.cli_cod = c.cli_cod
            and clcp_data_compra between '2020-10-01' and '2020-10-30'
          group by c.cli_flg_sexo) a) a

`;