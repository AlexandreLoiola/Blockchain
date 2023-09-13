# API Blockchain

## 📌 Pré-requisitos
Antes de começar, você vai precisar ter instalado em sua máquina a seguinte ferramenta :

- [Node.js](https://nodejs.org/en)

## 🚀 Iniciar Projeto

### Instalação :
    # Clone este repositório
    $ git clone https://github.com/AlexandreLoiola/Blockchain.git

    # Navegue até a pasta raiz do projeto
    $ cd blockchain

    # Instale as dependências
    $ npm install

    # Build o projeto
    $ npm run build

    # Inicie a aplicação
    $ npm run start

    # O servidor http inciará na porta: 3001
    # O servidor ws iniciará na porta: 5001
    # Caminho da Api - http://localhost:3001/api/blockchain/

    # Documentação - http://localhost:3001/doc

## Iniciando novos peers :
 Para adicionar novos pares à rede a partir de um mesmo computador, é necessário configurar as portas http e ws. Além de indicar pelo menos um peer ativo na rede para sincronização de dados.

 Utilizar um terminal em que seja possível configurar as variáveis do processo, por exemplo o gitbash. 

    
    # Abra o gitbash, ou outro terminal, na raiz do sistema

    # Inicie o primeiro nó
    $ npm run start

    # Adicionando o segundo nó da rede
    $ HTTP_PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run start

    # Adicionando o terceiro nó da rede
    $ HTTP_PORT=3003 P2P_PORT=5003 PEERS=ws://localhost:5001,ws://localhost:5002 npm run start

## 📖 Documentação dos Endpoints
A documentação completa da api do projeto está disponível através do Swagger.

![Documentação Swagger](.\images\swagger-documentation.png)

Para visualizar a documentação do projeto e obter informações detalhadas sobre os endpoints, parâmetros, modelos de dados e demais recursos disponíveis na API, inicie o Backend do projeto e clique [aqui](http://localhost:3001/doc).

## ⚙️ Executando os Testes

    # Visualize a cobertura dos testes
    $ npm run test:coverage

    # Executa todos os testes
    $ npm test

    # Executa todos os testes de uma única classe
    $ npm test '<Caminho da Classe>'

    # Executa um único teste
    $ npm test -- -t '<Nome do Teste>'

## 📝 Licensa
Este projeto está sob a licença MIT - veja o arquivo LICENSE.md para detalhes.