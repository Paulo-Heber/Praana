// constants.ts
import { PhaseDataMap, SpecialDayMessages } from './types';

export const phaseData: PhaseDataMap = {
  phase0to4: {
    title: "Dias 0-4: O Vale da Tempestade",
    description: "O desafio é passar 4 dias sem ejacular. A meta é sobreviver à tempestade e sair do vale.",
    symptoms: [
      { text: "Sintomas:", type: "title" },
      { text: "Cansaço", type: "warning" },
      { text: "Mente nublada", type: "warning" },
      { text: "Baixa clareza e motivação", type: "warning" },
      { text: "Ansiedade", type: "warning" },
      { text: "Insegurança", type: "warning" },
      { text: "Diminuição das habilidades sociais", type: "warning" },
      { text: "Sensação de vazio e inferioridade", type: "warning" }
    ]
  },
  phase5to9: {
    title: "Dias 5-9: Zona de Perigo",
    description: "Dias de perigo pois as tentações são fortes.",
    symptoms: [
      { text: "Clareza mental", type: "positive" },
      { text: "Energia e humor normais", type: "positive" },
      { text: "Tentações intensas - mantenha-se vigilante", type: "warning" }
    ]
  },
  phase10to30: {
    title: "Dias 10-30: Explosão de Energia",
    description: "Está carregado de dinamite. Canalize a explosão, ou ela te destruirá.",
    symptoms: [
      { text: "Energia abundante", type: "positive" },
      { text: "Confiança elevada", type: "positive" },
      { text: "Clareza mental intensa", type: "positive" },
      { text: "Mudanças corporais visíveis", type: "positive" },
      { text: "Voz mais grave", type: "positive" },
      { text: "Olhar firme", type: "positive" },
      { text: "Magnetismo social", type: "positive" },
      { text: "Cuidado: ego inflado", type: "warning" },
      { text: "Cuidado: impulsividade e agressividade", type: "warning" },
      { text: "Perigo de recaída", type: "warning" }
    ],
    goal: "Transmutar a energia sexual em ação criativa: exercícios físicos intensos, projetos criativos e profissionais, meditação e respiração profunda."
  },
  phase30to90: {
    title: "Dias 30-90: Estabilização e Maestria",
    description: "Não é mais fazer retenção, é ser um homem que retém.",
    symptoms: [
      { text: "Paz interior", type: "positive" },
      { text: "Estabilidade emocional", type: "positive" },
      { text: "Clareza mental plena", type: "positive" },
      { text: "Autoconfiança natural e magnetismo equilibrado", type: "positive" },
      { text: "Capacidade de ver os outros com empatia e respeito", type: "positive" },
      { text: "Transformações na mente-corpo-espírito", type: "positive" },
      { text: "Ansiedade social desaparece", type: "positive" },
      { text: "Disciplina se expande para todas as áreas da vida", type: "positive" }
    ],
    goal: "Atingir fluência e naturalidade. A meta é a integração completa."
  },
  phase90plus: {
    title: "Dia 90+: Transcendência",
    description: "Reconstrução celular e consolidação total. O auge da energia.",
    symptoms: [
      { text: "Clareza profunda", type: "positive" },
      { text: "Intuição aguçada", type: "positive" },
      { text: "Recepção energética e sincronicidades", type: "positive" },
      { text: "Sensação de unidade com o cosmo", type: "positive" },
      { text: "Propósito de vida começa a se revelar", type: "positive" },
      { text: "Vibrações energéticas elevadas", type: "positive" },
      { text: "Sabedoria, compaixão e poder equilibrado", type: "positive" }
    ],
    goal: "Contribuir, compartilhar o conhecimento e inspirar os outros."
  }
};

export const milestones: number[] = [5, 10, 30, 90];
export const specialDays: number[] = [7, 14, 20, 30, 90];

export const specialDayMessages: SpecialDayMessages = {
  7: "Aumento perceptível de testosterona",
  14: "A força de vontade se consolida",
  20: "Mudanças neurológicas começam a acontecer",
  30: "Novos padrões neurológicos começam a aparecer",
  90: "Reconstrução celular e consolidação total"
};