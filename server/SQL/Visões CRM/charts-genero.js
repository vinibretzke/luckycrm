exports.generoUnidade = `select unid_cod label,
coalesce(sum(venda_homem), 0) venda_homem,
coalesce(sum(venda_mulher), 0) venda_mulher,
coalesce(sum(venda_outros), 0) venda_outros
from (select unid_cod,
        case
          when sexo = 'M' then
           venda
        end venda_homem,
        
        case
          when sexo = 'F' then
           venda
        end venda_mulher,
        
        case
          when sexo = 'O' then
           venda
        end venda_outros
   from (select cc.unid_cod,
                coalesce(c.cli_flg_sexo, 'O') sexo,
                sum(clcp_val_total) venda,
                count(clcp_val_total) cupons
           from cliente c, cliente_cupom cc
          where cc.cli_cod = c.cli_cod
           and 	cc.unid_cod not in (8)
            and clcp_data_compra between '2020-10-01' and '2020-10-30'
          group by cc.unid_cod,coalesce(c.cli_flg_sexo, 'O')) a) a
          group by unid_cod
`

exports.generoSemana = `select descr label, 
coalesce(venda_homem, 0) venda_homem,
coalesce(venda_mulher, 0) venda_mulher, 
coalesce(venda_outros, 0) venda_outros
from (select dia,
        coalesce(sum(venda_homem), 0) venda_homem,
        coalesce(sum(venda_mulher), 0) venda_mulher,
        coalesce(sum(venda_outros), 0) venda_outros
   from (select dia,
                case
                  when sexo = 'M' then
                   venda
                end venda_homem,
                
                case
                  when sexo = 'F' then
                   venda
                end venda_mulher,
                
                case
                  when sexo = 'O' then
                   venda
                end venda_outros
           from (select DAYOFWEEK(cc.clcp_data_compra) dia,
                        coalesce(c.cli_flg_sexo, 'O') sexo,
                        sum(clcp_val_total) venda,
                        count(clcp_val_total) cupons
                   from cliente c, cliente_cupom cc
                  where cc.cli_cod = c.cli_cod
                    and clcp_data_compra between '2020-10-01' and '2020-10-30'
                  group by DAYOFWEEK(cc.clcp_data_compra), coalesce(c.cli_flg_sexo, 'O')) a) a
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

exports.generoPartipacao = `select periodo label,
truncate(venda_homem / venda_geral, 4) per_homem,
truncate(venda_mulher / venda_geral, 4) per_mulher,
truncate(venda_outros / venda_geral, 4) per_outros
from (select periodo,
        coalesce(sum(venda_homem), 0) venda_homem,
        coalesce(sum(venda_mulher), 0) venda_mulher,
        coalesce(sum(venda_outros), 0) venda_outros,
        coalesce(sum(venda_homem), 0)+coalesce(sum(venda_mulher), 0)+coalesce(sum(venda_outros), 0) venda_geral
   from (select periodo,
                case
                  when sexo = 'M' then
                   venda
                end venda_homem,
                
                case
                  when sexo = 'F' then
                   venda
                end venda_mulher,
                
                case
                  when sexo = 'O' then
                   venda
                end venda_outros
           from (select date_format(clcp_data_compra, '%Y/%m') periodo,
                        coalesce(c.cli_flg_sexo, 'O') sexo,
                        sum(clcp_val_total) venda
                   from cliente c, cliente_cupom cc
                  where cc.cli_cod = c.cli_cod
                    and clcp_data_compra >=
                        date_add(DATE_ADD(LAST_DAY(current_date), interval 1 DAY),
                                 interval - 23 Month)
                  group by date_format(clcp_data_compra, '%Y/%m'),
                           coalesce(c.cli_flg_sexo, 'O')) a) a
  group by periodo) a
`

exports.generoTime = `SELECT team as label,
Sum(qtd_homens)   AS QTD_HOMENS,
Sum(qtd_mulheres) AS QTD_MULHERES,
Sum(qtd_geral)    AS QTD_GERAL,
sum(qtd_homens + qtd_mulheres + qtd_geral) as TOTAL
FROM   (SELECT team,
        COALESCE(CASE
                   WHEN sexo = 'M' THEN Count(*)
                 END, 0) AS QTD_HOMENS,
        COALESCE(CASE
                   WHEN sexo = 'F' THEN Count(*)
                 END, 0) AS QTD_MULHERES,
        COALESCE(CASE
                   WHEN sexo = 'O' THEN Count(*)
                 END, 0) AS QTD_GERAL
 FROM   (SELECT coalesce(cli_flg_sexo,'O') AS SEXO,
                CASE
                  WHEN cli_avatar = 67 THEN 'CAP'
                  WHEN cli_avatar = 68 THEN 'CAM'
                  WHEN cli_avatar = 69 THEN 'AVA'
                  WHEN cli_avatar = 70 THEN 'BAH'
                  WHEN cli_avatar = 71 THEN 'BOT'
                  WHEN cli_avatar = 72 THEN 'CEA'
                  WHEN cli_avatar = 73 THEN 'CHA'
                  WHEN cli_avatar = 74 THEN 'COR'
                  WHEN cli_avatar = 75 THEN 'CRU'
                  WHEN cli_avatar = 76 THEN 'CSA'
                  WHEN cli_avatar = 77 THEN 'FLA'
                  WHEN cli_avatar = 78 THEN 'FLU'
                  WHEN cli_avatar = 79 THEN 'FOR'
                  WHEN cli_avatar = 80 THEN 'GOI'
                  WHEN cli_avatar = 81 THEN 'GRE'
                  WHEN cli_avatar = 82 THEN 'INT'
                  WHEN cli_avatar = 83 THEN 'PAL'
                  WHEN cli_avatar = 84 THEN 'SAN'
                  WHEN cli_avatar = 85 THEN 'SPFC'
                  WHEN cli_avatar = 86 THEN 'VAS'
                  WHEN cli_avatar = 87 THEN 'AFC'
                  WHEN cli_avatar = 88 THEN 'ACG'
                  WHEN cli_avatar = 89 THEN 'CAB'
                  WHEN cli_avatar = 90 THEN 'GEB'
                  WHEN cli_avatar = 91 THEN 'CFC'
                  WHEN cli_avatar = 92 THEN 'CRB'
                  WHEN cli_avatar = 93 THEN 'CRI'
                  WHEN cli_avatar = 94 THEN 'CEC'
                  WHEN cli_avatar = 95 THEN 'FFC'
                  WHEN cli_avatar = 96 THEN 'GFC'
                  WHEN cli_avatar = 97 THEN 'LEC'
                  WHEN cli_avatar = 98 THEN 'FOE'
                  WHEN cli_avatar = 99 THEN 'OFEC'
                  WHEN cli_avatar = 100 THEN 'PAR'
                  WHEN cli_avatar = 101 THEN 'AAPP'
                  WHEN cli_avatar = 102 THEN 'ECSB'
                  WHEN cli_avatar = 103 THEN 'SPT'
                  WHEN cli_avatar = 104 THEN 'VNFC'
                  WHEN cli_avatar = 105 THEN 'VFC'
                  WHEN cli_avatar = 106 THEN 'BARCELONA'
                  WHEN cli_avatar = 107 THEN 'BAYERN M.'
                  WHEN cli_avatar = 108 THEN 'ROMA'
                  WHEN cli_avatar = 109 THEN 'PSG'
                  WHEN cli_avatar = 110 THEN 'MILAN'
                  WHEN cli_avatar = 111 THEN 'OL'
                  WHEN cli_avatar = 112 THEN 'INTER M.'
                  WHEN cli_avatar = 113 THEN 'BVB'
                  WHEN cli_avatar = 114 THEN 'CHELSEA'
                  WHEN cli_avatar = 115 THEN 'MAN. UNITED'
                  WHEN cli_avatar = 116 THEN 'LIVERPOOL'
                  WHEN cli_avatar = 117 THEN 'MAN. CITY'
                  WHEN cli_avatar = 118 THEN 'REAL MADRID'
                  WHEN cli_avatar = 119 THEN 'JUVENTUS'
                  WHEN cli_avatar = 120 THEN 'ARSENAL'
                  WHEN cli_avatar = 121 THEN 'PORTO'
                END          AS TEAM
         FROM   cliente
         WHERE  cli_avatar >= 67) AS TIMES
 GROUP  BY team,
           sexo) AS TORCIDA
GROUP  BY team
ORDER  BY TOTAL DESC
limit 20
`