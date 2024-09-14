// Função para gerar e baixar o PDF
function downloadCurriculo() {
    const { jsPDF } = window.jspdf; // Acessa a função jsPDF da biblioteca
  
    // Seleciona o elemento que contém o currículo
    const elementHTML = document.querySelector('.cv-container');
  
    // Usa html2canvas para capturar o elemento HTML como imagem
    html2canvas(elementHTML).then((canvas) => {
      const imgData = canvas.toDataURL('image/png'); // Converte o canvas para uma imagem PNG
      const pdf = new jsPDF(); // Cria uma nova instância do jsPDF
  
      // Calcula as dimensões da imagem e ajusta para o PDF
      const imgWidth = 190; // Largura da imagem no PDF (aproximadamente A4)
      const pageHeight = 295; // Altura da página no PDF
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Proporção correta da imagem
  
      let heightLeft = imgHeight;
      let position = 0;
  
      // Adiciona a imagem ao PDF, ajustando a altura da página se necessário
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
  
      // Adiciona páginas extras se a altura da imagem exceder a altura da página PDF
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
  
      // Após a geração do PDF, o arquivo é baixado
      pdf.save('Curriculo_JoaoPedro.pdf');
    });
  }
  
  // Espera o documento estar carregado
  document.addEventListener('DOMContentLoaded', function() {
    // Adiciona o evento de clique ao botão
    const button = document.querySelector('.btn-create-cv');
    
    // Verifica se o botão existe para evitar erros
    if (button) {
      button.addEventListener('click', downloadCurriculo);
    }
  });
  