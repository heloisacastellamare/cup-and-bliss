describe('Suíte de Testes - Pedidos e Checkout', () => {
  test('Deve calcular o valor total do carrinho corretamente', () => {
    const itens = [
      { nome: 'Doce de Leite', preco: 12.0, quantidade: 2 },
      { nome: 'Café Coado', preco: 6.0, quantidade: 1 }
    ];
    const total = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
    expect(total).toBe(30.0);
  });
});