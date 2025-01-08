import { Injectable } from '@nestjs/common';
const PDFParser = require('pdf2json');

// Interfaces
interface TextoExtraido {
  text: string;
  x: number;
  y: number;
}

export interface NotaFiscalItem {
  sequencial?: string;
  codigo: string;
  descricao: string;
  quantidade: string;
  valorUnitario?: string;
  valorTotal: string;
  unidade?: string;
}

export interface NotaFiscalValores {
  valorTotal: string;
}

export interface NotaFiscalData {
  numeroNF: string;
  fornecimento: string;
  itens: NotaFiscalItem[];
}

@Injectable()
export class PdfExtractorUtils {
  async extractDataFromPDF(pdfFile: Buffer | string): Promise<NotaFiscalData> {
    const pdfParser = new PDFParser();

    return new Promise((resolve, reject) => {
      // Verifica se o arquivo é um Buffer ou uma string
      if (Buffer.isBuffer(pdfFile)) {
        pdfParser.parseBuffer(pdfFile);
      } else {
        pdfParser.loadPDF(pdfFile); // Caso seja string, carrega diretamente o arquivo.
      }

      pdfParser.on('pdfParser_dataReady', (pdfData) => {
        try {
          const extractedData = this.processExtractedText(pdfData);
          resolve(extractedData);
        } catch (error) {
          reject(error);
        }
      });

      pdfParser.on('pdfParser_dataError', (error) => {
        reject(error);
      });
    });
  }

  private processExtractedText(pdfData: any): NotaFiscalData {
    const nfData: NotaFiscalData = {
      numeroNF: '',
      fornecimento: '',
      itens: [],
    };

    const textos: TextoExtraido[] = this.extractTextosFromPDF(pdfData);

    this.extrairChaveAcesso(textos, nfData);
    const modeloNF = this.identificarModeloNF(textos);
    this.extrairDadosComuns(textos, nfData);

    if (modeloNF === 3) {
      this.extractItemsModelo3(textos, nfData.itens);
    } else {
      this.extractItems(textos, nfData.itens);
    }

    return nfData;
  }

  private extractTextosFromPDF(pdfData: any): TextoExtraido[] {
    const textos: TextoExtraido[] = [];
    pdfData.Pages.forEach((page: any) => {
      page.Texts.forEach((text: any) => {
        textos.push({
          text: decodeURIComponent(text.R[0].T),
          x: text.x,
          y: text.y,
        });
      });
    });
    return textos;
  }

  private identificarModeloNF(textos: TextoExtraido[]): number {
    const hasHash = textos.some(
      (t) => t.x === 2.6 && /^[A-Z0-9#]+$/.test(t.text),
    );
    const hasFormatted = textos.some((t) =>
      /^0*\d{2,3}-\d{4}-\d$/.test(t.text),
    );
    const hasNewFormat = textos.some(
      (t) =>
        t.x === 2.848 &&
        /^\d{4}$/.test(t.text) &&
        textos.some((n) => n.x === 4.798 && /^\d{4}-\d{4}-\d$/.test(n.text)),
    );

    if (hasNewFormat) return 3;
    if (hasHash || hasFormatted) return 1;
    return 0;
  }

  private extrairCodigo(linha: TextoExtraido[]): string {
    const codigoComHash = linha.find(
      (t) => t.x === 2.6 && /^[A-Z0-9#]+$/.test(t.text),
    );
    const codigoFormatado = linha.find((t) =>
      /^0*\d{2,3}-\d{4}-\d$/.test(t.text),
    );

    if (codigoComHash) {
      return codigoComHash.text.replace('#', '');
    }

    return codigoFormatado ? codigoFormatado.text : '';
  }

  private extractItems(textos: TextoExtraido[], itens: NotaFiscalItem[]): void {
    const linhas = this.agruparPorLinhas(textos);

    linhas.forEach((linha) => {
      let codigo = this.extrairCodigo(linha);

      if (codigo) {
        const codigoParts = codigo.split('-');

        if (codigoParts.length === 3 && codigoParts[0].length < 4) {
          codigoParts[0] = codigoParts[0].padStart(4, '0');
          codigo = codigoParts.join('-');
        }

        itens.push({
          codigo,
          descricao:
            linha
              .filter((t) => t.x > 2 && t.x < 8) // Filtra as partes que têm x entre 2 e 8
              .map((t) => t.text) // Mapeia para extrair o texto
              .join(' ') || '',
          quantidade: linha.find((t) => t.x > 15 && t.x < 18)?.text || '',
          valorUnitario: linha.find((t) => t.x > 18 && t.x < 21)?.text || '',
          valorTotal: linha.find((t) => t.x > 21 && t.x < 24)?.text || '',
        });
      }
    });
  }

  private extractItemsModelo3(
    textos: TextoExtraido[],
    itens: NotaFiscalItem[],
  ): void {
    const linhas = this.agruparPorLinhas(textos);

    linhas.forEach((linha, index) => {
      const sequencial = linha.find(
        (t) => t.x === 2.848 && /^\d{4}$/.test(t.text),
      );
      const codigoProduto = linha.find(
        (t) => t.x === 4.798 && /^\d{4}-\d{4}-\d$/.test(t.text),
      );

      if (sequencial && codigoProduto) {
        const proximaLinha = linhas[index + 1] || [];

        itens.push({
          sequencial: sequencial.text,
          codigo: codigoProduto.text,
          descricao: proximaLinha.find((t) => t.x === 4.798)?.text || '',
          unidade: proximaLinha.find((t) => t.x === 18.801)?.text || '',
          quantidade:
            proximaLinha
              .find((t) => t.x === 24.898 || t.x === 24.895)
              ?.text?.trim() || '',
          valorTotal:
            proximaLinha
              .find((t) => t.x === 30.614 || t.x === 30.61)
              ?.text?.trim() || '',
        });
      }
    });
  }

  private extrairChaveAcesso(
    textos: TextoExtraido[],
    nfData: NotaFiscalData,
  ): void {
    const chaveText = textos.find((t) => t.text.includes('DOCTO MATERIAL:'));
    if (chaveText) {
      const match = chaveText.text.match(/DOCTO MATERIAL:\s*(\d+)/);
      if (match) {
        nfData.fornecimento = match[1].replace('/', '');
      }
    }

    const rText = textos.find((t) => t.text.includes('R.:'));
    if (rText) {
      const match = rText.text.match(/R\.:?\s*(\d+)/);
      if (match) {
        nfData.fornecimento = match[1].replace('/', '');
      }
    }

    const chavePosText = textos.find((t) => t.x === 0.53 && t.y === 39.9);
    if (chavePosText) {
      nfData.fornecimento = chavePosText.text.trim().replace('/', '');
    }

    const numeroText = textos.find((t) => t.x === 1.326 && t.y === 37.177);
    if (numeroText) {
      nfData.fornecimento = numeroText.text.trim().replace('/', '');
    }
  }

  private extrairDadosComuns(
    textos: TextoExtraido[],
    nfData: NotaFiscalData,
  ): void {
    const nfText = textos.find(
      (t) =>
        (t.x > 30 && t.x < 31 && t.y > 1 && t.y < 2) ||
        (t.x > 28 && t.x < 29 && t.y > 3.5 && t.y < 4.5),
    );

    if (nfText) {
      nfData.numeroNF = nfText.text.trim();
    }
  }

  private findTextByKey(
    textos: TextoExtraido[],
    key: string,
  ): TextoExtraido | undefined {
    return textos.find((t) => t.text.includes(key));
  }

  private agruparPorLinhas(textos: TextoExtraido[]): TextoExtraido[][] {
    const linhasMap = new Map<number, TextoExtraido[]>();

    textos.forEach((t) => {
      if (!linhasMap.has(t.y)) {
        linhasMap.set(t.y, []);
      }
      linhasMap.get(t.y)?.push(t);
    });

    return Array.from(linhasMap.values());
  }
}
