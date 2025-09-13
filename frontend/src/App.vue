<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/cadastro">Cadastro</RouterLink>
        <RouterLink to="/solicitacao">Nova Solicitação</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
/* Adicione um pouco de espaçamento entre os links */
nav a {
  margin: 0 10px;
}
</style>