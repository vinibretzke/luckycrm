exports.cardsPromo = `select (select count(*) from cliente where cli_data_cadastro between '2020-10-01' and '2020-10-30') novos_clientes,
                 (select count(*)
                    from cliente
                   where cli_cod in (select cli_cod
                                       from cliente_cupom
                                      where clcp_data_compra between '2020-10-01' and '2020-10-30')) clientes_ativos,
                 (select sum(clcp_val_total)
                    from cliente_cupom
                   where clcp_data_compra between '2020-10-01' and '2020-10-30') venda_total,
                 (select sum(clcp_val_total)
                    from cliente_cupom
                   where clcp_data_compra between '2020-10-01' and '2020-10-30'
                     and cli_cod is not null) venda_promo,
                 (select avg(clcp_val_total)
                    from cliente_cupom
                   where clcp_data_compra between '2020-10-01' and '2020-10-30'
                     and cli_cod is not null) tk_medio_promo,
                 (select count(clcp_val_total)
                    from cliente_cupom
                   where clcp_data_compra between '2020-10-01' and '2020-10-30'
                     and cli_cod is not null) qtd_cupons,
                 (select avg(val)
                    from (select cli_cod, avg(clcp_val_total) val
                            from cliente_cupom
                           where clcp_data_compra between '2020-10-01' and '2020-10-30'
                             and cli_cod is not null
                           group by cli_cod) a) gasto_medio,
                 (select avg(val)
                    from (select cli_cod, count(clcp_val_total) val
                            from cliente_cupom
                           where clcp_data_compra between '2020-10-01' and '2020-10-30'
                             and cli_cod is not null
                           group by cli_cod) a) cupons_cliente,
                 (select count(*)
                    from cliente
                   where cli_cod not in
                         (select cli_cod
                            from cliente_cupom
                           where clcp_data_compra between '2020-10-01' and '2020-10-30')) clientes_perdidos`;