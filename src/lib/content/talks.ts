import type { SiteLanguage } from '#lib/site-language.ts';

export type Slide = {
    title: string;
    speakerDeckId: string;
    speakerDeckUrl: string;
  };

export type Talk = {
    title: Record<SiteLanguage, string>;
    date: string;
    detailsUrl: string;
    summary: Array<Record<SiteLanguage, string>>;
    /** 日本語版、英語版の順 */
    slides: Slide[];
  };

export const talks: Talk[] = [
    {
      title: { ja: "ローカルLLMによるデジタルフォレンジック支援ハーネスの設計と実装", en: "Design and Implementation of a Local LLM Harness for Digital Forensics" },
      date: '2026-11-25',
      detailsUrl: 'https://digitalforensic.jp/2026/09/15/ai23-3/',
      summary: [
        { ja: "ローカルLLMの特徴と制約、自律的なAIエージェントを支える概念の紹介。", en: "An introduction to the capabilities and limitations of local LLMs and the concepts behind autonomous AI agents." },
        { ja: "これをデジタルフォレンジックに適用するために求められる要件、設計思想、実装についての解説。", en: "Requirements, design principles, and implementation for applying these concepts to digital forensics." },
      ],
      slides: [
        {
          title: 'ローカルLLMによるデジタルフォレンジック支援ハーネスの設計と実装',
          speakerDeckId: 'b87de62202564e90ae531b36a982d776',
          speakerDeckUrl: 'https://speakerdeck.com/sumeshi/design-and-implementation-of-a-local-llm-harness-for-digital-forensics-ja',
        },
        {
          title: 'Design and Implementation of a Local LLM Harness for Digital Forensics',
          speakerDeckId: '79bc4427eaae4ce895d7ccfb7be7e108',
          speakerDeckUrl: 'https://speakerdeck.com/sumeshi/design-and-implementation-of-a-local-llm-harness-for-digital-forensics-en',
        },
      ],
    },
    {
      title: { ja: "FORENSIA: ローカルLLMフォレンジックハーネス", en: "FORENSIA: Local LLM Forensic Harness" },
      date: '2026-08-07',
      detailsUrl: 'https://digitalforensic.jp/2026/06/16/nextgen-wg-23-1/',
      summary: [
        { ja: "ローカルLLMでフォレンジック調査を支援するツール「FORENSIA」の設計思想と実装知見。", en: "Design principles and implementation lessons from FORENSIA, a tool that assists forensic investigations with local LLMs." },
        { ja: "弱いモデルを部品として使うためのハーネス設計（仮説検証ループ・記憶の構造化）について。", en: "Harness design for using weaker models as components, including hypothesis-testing loops and structured memory." },
      ],
      slides: [
        {
          title: 'FORENSIA: ローカルLLMフォレンジックハーネス',
          speakerDeckId: '4c6fd93396a44b799bdc0264ca38e03c',
          speakerDeckUrl: 'https://speakerdeck.com/sumeshi/forensia-rokarullmhuorenzitukuhanesu',
        },
        {
          title: 'FORENSIA: Local LLM Forensic Harness',
          speakerDeckId: '7074cedd400540dfafe8045b45603c6f',
          speakerDeckUrl: 'https://speakerdeck.com/sumeshi/forensia-local-llm-forensic-harness',
        },
      ],
    },
  ];


