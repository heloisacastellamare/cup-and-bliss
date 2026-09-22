describe('Suíte de Testes - Cardápio e Produtos', () => {
  test('Deve retornar a estrutura correta dos itens do cardápio', () => {
    const produto = { id: 101, nome: 'Café Espresso', preco: 8.5, categoria: 'Cafés' };
    expect(produto).toHaveProperty('nome');
    expect(produto.preco).toBeGreaterThan(0);
  });
});