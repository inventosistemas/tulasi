// Orientação para footer / conteúdo dinamico

GET dynamicContent?type=CONTENT_TOP
GET dynamicContent -> devolve todos os conteúdos dinamicos

tipos:
CONTENT_TOP -> Informações do topo
CONTENT_WHY -> informações de por que
CONTENT_SOCIAL -> informações de redes sociais
CONTENT_INFO -> conteúdo de informações
CONTENT_POLICY_SECURITY -> Política de segurança
CONTENT_POLICY_CHANGE -> Política de devolução e troca
CONTENT_POLICY_FREIGHT -> Política de frete
CONTENT_HELP -> Ajuda
CONTENT_FAQ -> FAQ



const content =
  {
    CONTENT_INFO : {
      Descricão: "Política de Segurança e privacidade",
      Link: "www.tulasi.com.br/aaaa",
      Ferramentas: pra que serve?,
      subContent: [
        {
          CONTENT_HELP : {
              Descricão: "Ajuda para Internet",
              Link: "www.tulasi.com.br/aaaa"
          },
        },
        {
          CONTENT_POLICY_CHANGE : {
              Descricão: "Política de troca e devolução",
              Link: "www.tulasi.com.br/aaaa"
          },
        }
      ]
    },
      {
        CONTENT_WHY: ""
      }
  }
