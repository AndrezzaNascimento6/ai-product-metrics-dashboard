# Product Signals

Dashboard fictício em React + TypeScript, criado para captura de vídeo horizontal.

## Executar

```sh
npm ci --cache /tmp/product-signals-npm
npm run dev
```

`npm run build` valida TypeScript e gera a versão de produção em `dist/`.

## Gravação

A composição mantém proporção 16:9 e cabe na janela sem scroll. O botão **Replay**, abaixo do quadro, reinicia a sequência de aproximadamente 7 segundos. Capture apenas o quadro para deixar o controle fora do vídeo. Ao terminar, a cena permanece no estado final.

- 0–2s: inicialização, contagem e desenho do gráfico.
- 2–4s: título e composição se estabilizam.
- 4–7s: aproximação, foco nos sinais do Android e pergunta final.

Os dados estão em `src/data.ts`, no objeto `productMetrics`. A série do gráfico é ilustrativa e normalizada (100 → 82); não representa uma taxa absoluta de conversão. Todos os dados são fictícios; não há backend, chamadas de IA ou credenciais.
