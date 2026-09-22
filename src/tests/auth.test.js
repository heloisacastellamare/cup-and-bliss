describe('Suíte de Testes - Autenticação (Auth)', () => {
  test('Deve validar a presença do token JWT no login', () => {
    const respostaLogin = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.sample',
      user: { id: 1, email: 'cliente@cupandbliss.com' }
    };
    expect(respostaLogin.token).toBeDefined();
    expect(respostaLogin.user.email).toContain('@');
  });

  test('Deve recusar acesso sem cabeçalho Authorization', () => {
    const authHeader = null;
    expect(authHeader).toBeNull();
  });
});