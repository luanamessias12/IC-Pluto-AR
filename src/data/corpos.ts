export type Categoria = 'planeta' | 'estrela' | 'satelite';

export interface Corpo {
  slug: string; // ex.: "jupiter" -> card: jupitercard, RA: jupiter-ra.html
  cardId: string;
  nome: string;
  categoria: Categoria;
  imagem: string;
  descricao: string;
  ra: string; // caminho da cena de RA (A-Frame) servida de /public
}

const mk = (
  slug: string,
  nome: string,
  categoria: Categoria,
  imagem: string,
  descricao: string,
  cardId = `${slug}card`,
): Corpo => ({
  slug,
  cardId,
  nome,
  categoria,
  imagem,
  descricao,
  ra: `/plataforma/planetas/Ra/${slug}-ra.html`,
});

export const corpos: Corpo[] = [
  mk('mercurio', 'Mercúrio', 'planeta', '/img/mercurio-img.jpg', 'Mercúrio é o planeta mais próximo do Sol. Ele é pequeno e rochoso, e tem temperaturas muito altas durante o dia e muito baixas à noite.'),
  mk('venus', 'Vênus', 'planeta', '/img/venus-img.jpg', 'Vênus é um planeta parecido com a Terra em tamanho, mas sua atmosfera é muito densa e quente, tornando-o um dos planetas mais quentes do sistema solar.'),
  mk('terra', 'Terra', 'planeta', '/img/terra-img.jpg', 'A Terra é o nosso planeta. Ela tem água, ar e vida, e é o único lugar conhecido onde existem seres vivos.'),
  mk('marte', 'Marte', 'planeta', '/img/marte-img.jpg', 'Marte é conhecido como o planeta vermelho por causa de sua cor. Ele é rochoso e frio, e cientistas estudam ele para possíveis futuras missões.'),
  mk('jupiter', 'Júpiter', 'planeta', '/img/jupiter-img.jpg', 'Júpiter é o maior planeta do sistema solar. Ele é gigante e gasoso, com uma famosa mancha vermelha que é uma tempestade enorme.'),
  mk('saturno', 'Saturno', 'planeta', '/img/saturno-img.jpg', 'Saturno é famoso por seus belos anéis. É um planeta gasoso muito grande, e seus anéis são feitos de gelo e poeira.'),
  mk('urano', 'Urano', 'planeta', '/img/urano-img.jpg', 'Urano é um planeta gigante de gás com cor azul-esverdeada. Ele gira de lado em relação aos outros planetas.'),
  mk('netuno', 'Netuno', 'planeta', '/img/netuno-img.jpg', 'Netuno é o planeta mais distante do Sol. Ele é frio, azul e tem ventos muito fortes.'),
  mk('sol', 'Sol', 'estrela', '/img/sol-img.jpg', 'O Sol é a estrela do nosso sistema solar. Ele é enorme, muito quente e é a principal fonte de luz e calor para a Terra. Sem o Sol, a vida no planeta não seria possível.'),
  mk('lua', 'Lua', 'satelite', '/img/lua-img.jpg', 'A Lua é o satélite natural da Terra. Ela não tem luz própria, mas reflete a luz do Sol, e é responsável pelas marés nos oceanos.'),
];

export const porCategoria = (c: Categoria) => corpos.filter((x) => x.categoria === c);
export const porCardId = (id: string) => corpos.find((x) => x.cardId === id);

export const categoriaTitulo: Record<Categoria, string> = {
  planeta: 'Planetas',
  estrela: 'Estrelas',
  satelite: 'Satélites',
};

