# Sistema de Inventário com NestJS

Este projeto foi criado para resolver um problema de gerenciamento de inventário onde eu trabalho. Anteriormente, o inventário era gerenciado usando planilhas do Excel, o que era ineficiente e propenso a erros. Este sistema foi criado para automatizar o processo e torná-lo mais eficiente

## Funcionalidades

- Exportar para Excel
  O usuário tem a opção de exportar os dados do inventário para um arquivo Excel. Isso permite que as informações sejam facilmente compartilhadas ou importadas para outros sistemas.

- Importar do Excel
  Os usuários podem fazer upload de um arquivo Excel contendo os dados do inventário. O sistema processará o arquivo e atualizará o inventário com as informações fornecidas.

- Dashboard
  O sistema apresenta um painel de controle (dashboard) que fornece uma visão geral das informações do inventário. O dashboard exibe estatísticas e gráficos relevantes para facilitar a análise dos dados.

- Sistema de Pontos
  Implementamos um sistema de pontos para incentivar os usuários a realizar o inventário com precisão e eficiência. Cada usuário recebe pontos com base na acurácia das contagens realizadas. Isso promove a responsabilidade e a precisão nas atividades de inventário.

- Pesquisa
  Os usuários podem pesquisar materiais, descrições e endereços específicos no sistema de inventário. Isso facilita a localização de itens específicos e agiliza o processo de consulta de informações.

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`SECRET_KEY`

`DATABASE_URL`
