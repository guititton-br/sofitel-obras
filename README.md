# 🏛️ Sofitel RJ · Dashboard de Gestão de Pedras

Dashboard para acompanhamento da instalação de pedras (piso, parede, bancada)
do 5° ao 20° pavimento do Hotel Sofitel Rio de Janeiro.

---

## ✅ Configuração em 3 passos (≈ 20 minutos)

---

### PASSO 1 — Criar o banco de dados Firebase (grátis)

1. Acesse [console.firebase.google.com](https://console.firebase.google.com)
2. Clique em **"Adicionar projeto"** → dê um nome (ex: `sofitel-obras`)
3. Desative o Google Analytics (não é necessário) → **Criar projeto**
4. No menu lateral, clique em **"Build"** → **"Realtime Database"**
5. Clique em **"Create Database"** → escolha **"Start in test mode"** → **Enable**
6. Clique em **"⚙️ Configurações do projeto"** (ícone de engrenagem)
7. Desça até **"Seus aplicativos"** → clique em `</> Web`
8. Dê um nome (ex: `sofitel-web`) → **Registrar aplicativo**
9. **Copie o objeto `firebaseConfig`** — você vai precisar no próximo passo

---

### PASSO 2 — Configurar o arquivo `index.html`

Abra o arquivo `index.html` em qualquer editor de texto e localize este trecho:

```javascript
const FIREBASE_CONFIG = {
  apiKey:            "COLE_SUA_API_KEY",
  authDomain:        "SEU-PROJETO.firebaseapp.com",
  databaseURL:       "https://SEU-PROJETO-default-rtdb.firebaseio.com",
  ...
};
```

Substitua pelos valores copiados do Firebase e salve o arquivo.

---

### PASSO 3 — Publicar no Vercel (grátis, URL pública)

1. Crie uma conta em [vercel.com](https://vercel.com) (pode usar Google)
2. Clique em **"Add New Project"** → **"Browse"** → selecione esta pasta
   - Ou arraste a pasta para a área de upload no Vercel
3. Na tela de configuração, clique em **"Environment Variables"** e adicione:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** sua chave da API Anthropic (de [console.anthropic.com](https://console.anthropic.com))
4. Clique em **Deploy** — pronto! Você receberá uma URL tipo `sofitel-obras.vercel.app`

> **Sem a chave Anthropic:** o dashboard funciona normalmente, apenas o botão
> "Análise IA" não funcionará. Você pode adicionar depois.

---

## 👥 Compartilhar com a equipe

Basta enviar a URL do Vercel para cada membro. Todos veem os mesmos dados em tempo real, sem precisar de login ou cadastro.

**Recomendação de acesso:**
| Perfil | Acesso |
|--------|--------|
| Gerente de Obra (GO) | Dashboard + Atualização Diária |
| Diretor / CEO | Dashboard + Análise IA |
| Coordenador | Configurações + todas as telas |

> Para restrição de acesso por perfil, fale com seu desenvolvedor para adicionar
> autenticação Firebase simples (1-2 horas de trabalho).

---

## 🔐 Segurança do banco de dados Firebase

Por padrão, o banco está em "test mode" (aberto). Para proteger:

1. No Firebase, vá em **Realtime Database → Rules**
2. Substitua o conteúdo por:
```json
{
  "rules": {
    "sofitel": {
      ".read": true,
      ".write": true
    }
  }
}
```
3. Para segurança adicional, restrinja por IP ou adicione autenticação.

---

## 📂 Estrutura dos arquivos

```
sofitel-webapp/
├── index.html        ← Dashboard completo (edite a config Firebase aqui)
├── api/
│   └── analyze.js    ← Proxy para a IA (não precisa editar)
├── vercel.json       ← Configuração do Vercel (não precisa editar)
└── README.md         ← Este arquivo
```

---

## ❓ Problemas comuns

**"Sem conexão com Firebase"** → Verifique se o `databaseURL` no `FIREBASE_CONFIG` está correto
e se o banco está em modo de teste.

**Botão "Análise IA" não funciona** → Verifique se a variável `ANTHROPIC_API_KEY`
foi adicionada no Vercel corretamente.

**Dados não sincronizam** → Verifique as regras do Firebase (Passo 3 de segurança).

---

Desenvolvido com React, Firebase Realtime Database e Claude AI.
