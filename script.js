// Seleciona o contêiner onde os vídeos serão exibidos
const containerVideos = document.querySelector(".videos__container");

// Função assíncrona para buscar e mostrar vídeos
async function buscarEMostrarVideos() {
    try {
        // Faz uma requisição para buscar os vídeos
        const busca = await fetch("http://localhost:3000/videos");
        // Converte a resposta para formato JSON
        const videos = await busca.json();

        // Itera sobre cada vídeo retornado
        videos.forEach((video) => {
            // Verifica se a categoria do vídeo está vazia
            if (video.categoria == "") {
                throw new Error("Vídeo não tem categoria"); // Lança um erro se a categoria estiver vazia
            }
            // Adiciona o vídeo ao contêiner em formato HTML
            containerVideos.innerHTML += `
            <li class="videos__item">
                <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                <div class="descricao-video">
                    <img class="img-canal" src="${video.imagem}" alt="logo do canal">
                    <h3 class="titulo-video">${video.titulo}</h3>
                    <p class="titulo-canal">${video.descricao}</p>
                    <p class="categoria" hidden>${video.categoria}</p> <!-- Categoria oculta -->
                </div>
            </li>
            `;
        });
    } catch (error) {
        // Se ocorrer um erro, exibe uma mensagem no contêiner
        containerVideos.innerHTML = `<p> Houve um erro ao carregar os vídeos: ${error}</p>`;
    } finally { 
        // Executa este bloco independentemente do que aconteceu no try/catch
        console.log("Tentativa de carregar os vídeos finalizada");
    }
}

// Chama a função para buscar e mostrar os vídeos
buscarEMostrarVideos();

// Seleciona a barra de pesquisa
const barraDePesquisa = document.querySelector(".pesquisar__input");

// Adiciona um ouvinte de evento à barra de pesquisa que chama a função de filtragem
barraDePesquisa.addEventListener("input", filtrarPesquisa);

// Função para filtrar vídeos com base no que foi digitado na barra de pesquisa
function filtrarPesquisa() {
    const videos = document.querySelectorAll(".videos__item"); // Seleciona todos os itens de vídeo
    let valorFiltro = barraDePesquisa.value.toLowerCase(); // Obtém o valor da barra de pesquisa em minúsculas

    // Itera sobre cada vídeo para aplicar o filtro
    videos.forEach((video) => {
        let titulo = video.querySelector(".titulo-video").textContent.toLowerCase(); // Obtém o título do vídeo em minúsculas

        // Verifica se o valor da pesquisa existe e se o título inclui esse valor
        video.style.display = valorFiltro ? titulo.includes(valorFiltro) ? 'block' : 'none' : 'block';
        // Se valorFiltro não estiver vazio, exibe o vídeo se o título incluir o filtro, senão oculta
        // Se valorFiltro estiver vazio, exibe todos os vídeos
    });
}


    // Substituição do Loop for...of por forEach: O loop for...of é substituído por forEach para percorrer os elementos videos. Isso torna o código mais legível e conciso.
    // Condição Ternária: A lógica condicional que define o estilo de exibição (display) dos vídeos é simplificada usando uma condição ternária. Isso elimina a necessidade de blocos if...else.

//     if(barraDePesquisa.value != ""){
//         for(let video of videos){
//             let titulo = video.querySelector(".titulo-video").textContent.toLowerCase();
//             let valorFiltro = barraDePesquisa.value.toLowerCase();

//             if(!titulo.includes(valorFiltro)){ //Usar `==` exige que o título do vídeo seja exatamente igual ao valor digitado, limitando a busca e ignorando variações como partes do título.
//                 video.style.display = "none"; //sumir com o vídeo
//             } else{
//                 video.style.display = "block"; //define que o elemento será exibido como um elemento de bloco, ocupando toda a largura disponível.
//             }
//         }
//     }else {
//         videos.style.display = "block" //se estiver vazio, todos aparecem
//     }
// }

// Seleciona todos os elementos com a classe "superior__item" e armazena em botaoCategoria
const botaoCategoria = document.querySelectorAll(".superior__item"); // Pegamos todos os botões (que têm a mesma classe)

// Itera sobre cada botão encontrado na colecaqo botaoCategoria
botaoCategoria.forEach((botao) => {
    // Obtem o valor do atributo "name" de cada botão, que representa a categoria
    let nomeCategoria = botao.getAttribute("name"); // Pegando todos os names de todos os botões que estão no HTML
    
    // Adiciona um ouvinte de evento de clique a cada botão
    botao.addEventListener("click", () => filtrarPorCategoria(nomeCategoria)); // Adiciona evento de click em cada botão que chama uma arrow function com filtrarPorCategoria, passando por parâmetro o nome da categoria
});

// Define a função que filtra os vídeos com base na categoria selecionada
function filtrarPorCategoria(filtro) { // filtro = nomeCategoria
    // Seleciona todos os vídeos disponíveis na página
    const videos = document.querySelectorAll(".videos__item");
    
    // Itera sobre cada vídeo encontrado na coleção videos
    videos.forEach((video) => {
        // Obtém a categoria do vídeo e converte para minúsculas para comparação
        let categoria = video.querySelector(".categoria").textContent.toLowerCase(); // Categoria dos vídeos existentes
        
        // Converte o filtro para minúsculas para comparação
        let valorFiltro = filtro.toLowerCase(); // Filtro é o nome do botão que foi clicado (categoria selecionada)

        // Verifica se a categoria do vídeo não inclui o valor do filtro e se o filtro é diferente de 'tudo'
        if (!categoria.includes(valorFiltro) && valorFiltro != 'tudo') { // Se a categoria não incluir valorFiltro e o valorFiltro for diferente de tudo, oculta o vídeo
            video.style.display = 'none'; // Oculta o vídeo
        } else {
            // Se a condição anterior não for verdadeira, o vídeo será exibido
            video.style.display = 'block'; // Exibe o vídeo
        }
    });
}
