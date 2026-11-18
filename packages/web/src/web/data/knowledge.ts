import type { ModelKind } from "../components/product-model";
export const sources = [
  {
    title: "OMS · Tecnologia assistiva",
    url: "https://www.who.int/news-room/fact-sheets/detail/assistive-technology",
  },
  {
    title: "OMS · Diretrizes para cadeiras de rodas",
    url: "https://www.who.int/publications/i/item/9789240074521",
  },
  {
    title: "IPC · Tecnologia no esporte paralímpico",
    url: "https://www.paralympic.org/feature/cutting-edge-technology-behind-para-sports",
  },
  {
    title: "Revisão científica · Próteses de membro superior e materiais",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7787923/",
  },
  {
    title: "Materiais · Carbono e termoplásticos",
    url: "https://www.infinitetech.org/carbon-fiber-vs-thermoplastic-in-prosthetics-and-orthotics",
  },
];
export const materials = [
  {
    id: "carbon",
    name: "Compósito de fibra de carbono",
    where: "Lâminas, pés, encaixes e algumas estruturas",
    good: "Alta rigidez e resistência em relação ao peso; pode armazenar energia elástica conforme o projeto.",
    bad: "Fabricação e reparo especializados; danos e delaminações exigem inspeção. Não é flexível em qualquer direção.",
    process:
      "Fibras orientadas em uma matriz de resina; laminação e cura controladas. O comportamento depende do desenho e da orientação das fibras.",
  },
  {
    id: "metal",
    name: "Alumínio e titânio",
    where: "Tubos, adaptadores, conexões e chassis",
    good: "Alumínio permite estruturas leves. Titânio combina resistência e boa resistência à corrosão.",
    bad: "Ligas e geometrias têm limites de fadiga. Titânio costuma exigir processos mais caros; nenhum metal dispensa manutenção.",
    process:
      "Usinagem, conformação e, conforme o projeto e a liga, união de componentes. Seleção e testes são indispensáveis.",
  },
  {
    id: "polymer",
    name: "Termoplásticos",
    where: "Encaixes de teste, revestimentos e carcaças",
    good: "Podem ser moldados com calor; facilitam determinadas adaptações e formas.",
    bad: "Resistência ao calor, desgaste e rigidez variam. Não substituem automaticamente um componente estrutural de carbono ou metal.",
    process:
      "Termoformagem ou outros processos próprios do polímero. Impressão 3D só deve ser usada em peças e aplicações validadas.",
  },
  {
    id: "silicone",
    name: "Silicone e elastômeros",
    where: "Liners, interfaces, revestimentos e pneus (outros elastômeros)",
    good: "Flexibilidade e amortecimento na interface; ajudam a distribuir contato conforme o ajuste.",
    bad: "Podem reter calor e umidade; exigem higiene e inspeção de desgaste. Conforto e tolerância da pele variam.",
    process:
      "Moldagem e cura conforme a formulação. O liner é dimensionado para a pessoa; pneus usam composições diferentes.",
  },
  {
    id: "textile",
    name: "Tecidos, espuma e borracha",
    where: "Assento, almofada, tiras, estofamento e contato com o solo",
    good: "Oferecem suporte, amortecimento ou aderência dependendo da peça.",
    bad: "Desgaste, sujeira e umidade demandam cuidado. Uma almofada inadequada não garante distribuição segura de pressão.",
    process:
      "Corte, costura, moldagem e montagem. Almofadas e suportes devem ser escolhidos com avaliação individual.",
  },
];
export const knowledge: Record<
  ModelKind,
  {
    name: string;
    overview: string;
    mechanism: string;
    use: string;
    benefit: string;
    limit: string;
    materials: string[];
    specs: [string, string][];
    care: string[];
    faq: [string, string][];
  }
> = {
  run: {
    name: "Prótese de corrida",
    overview:
      "Representação de uma prótese transtibial esportiva: o encaixe se conecta a uma lâmina curva. Uma prótese para amputação acima do joelho envolve outros componentes que este modelo não representa.",
    mechanism:
      "A lâmina se deforma sob carga e devolve parte da energia armazenada. Ela não cria energia nem possui motor no conceito apresentado. A resposta depende da rigidez, do alinhamento, do atleta e do solo.",
    use: "Corrida e treinamento esportivo após avaliação e adaptação. Não é, necessariamente, a opção adequada para caminhar no cotidiano.",
    benefit:
      "Forma e resposta elástica voltadas a movimentos esportivos; estrutura especializada para a atividade.",
    limit:
      "Não substitui todas as funções de um pé e tornozelo. Requer ajuste de rigidez, alinhamento e treinamento; não garante vantagem ou desempenho.",
    materials: ["carbon", "metal", "silicone", "textile"],
    specs: [
      ["Categoria", "Prótese de membro inferior · inspiração transtibial"],
      ["Mecanismo", "Lâmina passiva com resposta elástica"],
      ["Ajustes reais", "Encaixe, alinhamento, altura e rigidez"],
      ["Não representado", "Joelho protético e forças durante a corrida"],
    ],
    care: [
      "Inspecionar o encaixe, a lâmina e conexões conforme orientação do fabricante.",
      "Não usar peça com trincas ou folgas; procurar a equipe responsável.",
      "Respeitar o uso previsto e o acompanhamento profissional.",
    ],
    faq: [
      [
        "A lâmina tem motor?",
        "Não no conceito mostrado. A energia elástica vem da carga aplicada durante o movimento.",
      ],
      [
        "Posso usar a mesma lâmina para tudo?",
        "A finalidade e a compatibilidade precisam ser avaliadas. Um equipamento esportivo pode não ser adequado a atividades cotidianas.",
      ],
    ],
  },
  chair: {
    name: "Cadeira de rodas modular",
    overview:
      "Recurso de mobilidade com chassis, rodas, assento, encosto e apoios. Cadeira de rodas não é uma prótese: ela apoia a mobilidade sem substituir uma parte do corpo.",
    mechanism:
      "A propulsão manual ocorre pelos aros das rodas. Posição do eixo, apoio postural e distribuição de massa influenciam a condução e a estabilidade.",
    use: "Deslocamento cotidiano ou esporte adaptado, com configurações próprias para cada contexto. A versão esportiva aqui é uma inspiração visual, não uma cadeira aprovada para competição.",
    benefit:
      "Componentes adaptáveis podem adequar postura e condução às necessidades da pessoa e ao ambiente.",
    limit:
      "Rodas inclinadas podem ampliar a largura total. Ajustes que facilitam manobras também podem alterar a estabilidade; acessibilidade do percurso continua essencial.",
    materials: ["metal", "carbon", "textile", "silicone"],
    specs: [
      ["Categoria", "Recurso de mobilidade · propulsão manual"],
      ["Configurações 3D", "Urbana com apoios / inspiração esportiva"],
      [
        "Ajustes reais",
        "Largura e profundidade do assento, eixo, encosto e apoios",
      ],
      [
        "Não representado",
        "Avaliação postural, testes e prevenção de lesões por pressão",
      ],
    ],
    care: [
      "Verificar pneus, rodas, freios e fixações conforme o manual.",
      "Manter assento e almofada limpos e adequados ao posicionamento.",
      "Aprender propulsão e transferências com equipe qualificada.",
    ],
    faq: [
      [
        "Rodas inclinadas são sempre melhores?",
        "Não. A inclinação muda largura e comportamento. A escolha depende da atividade, do ambiente e das necessidades da pessoa.",
      ],
      [
        "Por que a almofada importa?",
        "Suporte, postura e distribuição de pressão fazem parte da escolha. Uma almofada genérica não é uma solução universal.",
      ],
    ],
  },
  leg: {
    name: "Prótese de perna cotidiana",
    overview:
      "O modelo representa uma prótese abaixo do joelho com encaixe, tubo estrutural, conexão e pé. Próteses acima do joelho incluem uma articulação adicional não mostrada aqui.",
    mechanism:
      "O encaixe transmite cargas do membro residual à estrutura e ao pé protético. O pé pode oferecer diferentes respostas mecânicas conforme o modelo real.",
    use: "Caminhada e tarefas cotidianas, quando indicado. Escolha do pé, ajuste e reabilitação dependem da pessoa e do ambiente.",
    benefit:
      "Pode apoiar mobilidade e participação no dia a dia; diferentes componentes permitem individualização.",
    limit:
      "Encaixe inadequado pode causar desconforto e problemas de pele. O modelo não reproduz equilíbrio, marcha nem compatibilidade real das peças.",
    materials: ["metal", "carbon", "polymer", "silicone"],
    specs: [
      ["Categoria", "Prótese de membro inferior · inspiração transtibial"],
      ["Mecanismo", "Estrutura passiva com pé protético"],
      ["Ajustes reais", "Encaixe, suspensão, alinhamento e componente do pé"],
      ["Não representado", "Joelho protético, marcha ou tolerância da pele"],
    ],
    care: [
      "Higienizar interfaces segundo orientação e inspecionar a pele.",
      "Dor persistente, vermelhidão ou feridas exigem avaliação; não tentar corrigir o encaixe sozinho.",
      "Reavaliar o ajuste quando houver mudanças de volume do membro.",
    ],
    faq: [
      [
        "O revestimento muda o funcionamento?",
        "Aqui é uma opção visual. Em equipamentos reais, revestimentos devem respeitar espaço, movimento e compatibilidade.",
      ],
      [
        "A prótese deve doer até acostumar?",
        "Dor persistente não deve ser ignorada. É necessário procurar a equipe de reabilitação para avaliar o encaixe e a pele.",
      ],
    ],
  },
  arm: {
    name: "Prótese de braço e mão",
    overview:
      "Modelo inspirado em uma prótese de antebraço com punho e mão articulada. Os dedos e as poses são ilustrações; o modelo não representa uma mão clínica funcional.",
    mechanism:
      "Próteses reais podem ser passivas, acionadas pelo corpo ou por sinais mioelétricos. O mecanismo de acionamento não foi definido neste conceito. A pose de preensão apenas demonstra a geometria.",
    use: "Apoio a tarefas específicas e interação com objetos, conforme a indicação e o treinamento. Nem toda pessoa prefere ou necessita de uma mão articulada.",
    benefit:
      "Soluções diferentes podem apoiar objetivos específicos, como segurar ou estabilizar objetos.",
    limit:
      "Sensibilidade, força, controle, peso e necessidade de manutenção variam. Abrir e fechar os dedos na tela não demonstra capacidade real de preensão.",
    materials: ["metal", "polymer", "silicone", "carbon"],
    specs: [
      ["Categoria", "Prótese de membro superior · inspiração transradial"],
      ["Mecanismo", "Articulação ilustrativa; acionamento não especificado"],
      ["Ajustes reais", "Encaixe, suspensão, punho e dispositivo terminal"],
      ["Não representado", "Sensores, bateria, força e controle mioelétrico"],
    ],
    care: [
      "Verificar fixações e integridade da interface conforme orientação.",
      "Para modelos eletrônicos reais, seguir restrições de água, carregamento e manutenção.",
      "Treinar tarefas com equipe qualificada e adaptar objetivos ao usuário.",
    ],
    faq: [
      [
        "Esta mão é mioelétrica?",
        "Não afirmamos isso. O modelo não tem sensores ou sistema de controle; mostra apenas duas poses.",
      ],
      [
        "Todos os dedos precisam se mover?",
        "Não. Dispositivos terminais e formas de controle são escolhidos conforme as atividades e preferências.",
      ],
    ],
  },
};
