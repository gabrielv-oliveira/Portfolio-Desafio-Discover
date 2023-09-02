// Função para buscar projetos no GitHub e exibir os dois últimos
async function fetchGitHubProjects() {
    try {
        const response = await fetch('https://api.github.com/users/gabrielv-oliveira/repos');
        const data = await response.json();

        if (response.ok) {
            const projectContainer = document.getElementById('github-projects-container');

            // Pega os dois últimos projetos
            const lastTwoProjects = data.slice(0, 2);

            lastTwoProjects.forEach(async (project) => {
                const projectDiv = document.createElement('div');
                projectDiv.classList.add('projects', 'pj');

                // Crie um elemento <a> (âncora) para o título do projeto
                const projectLink = document.createElement('a');
                projectLink.href = project.html_url; // Define o atributo href com a URL do projeto no GitHub

                // Adicione a imagem do ícone de pasta ao lado do nome do projeto
                const folderIcon = document.createElement('img');
                folderIcon.src = './assets/folder.svg';
                folderIcon.alt = 'Folder Icon'; // Texto alternativo da imagem da pasta

                const projectName = document.createElement('strong');
                projectName.textContent = project.name;
                projectName.innerHTML = `<img src="./assets/folder.svg" alt=""> ${project.name}`;

                // Crie um elemento <p> para a descrição do projeto
                const projectDescription = document.createElement('p');
                projectDescription.textContent = project.description;

                // Crie um elemento <div> para a seção de tecnologias
                const techDiv = document.createElement('div');
                techDiv.classList.add('group');

                // Consulte as informações do projeto no GitHub para obter a linguagem usada
                const techResponse = await fetch(`https://api.github.com/repos/gabrielv-oliveira/${project.name}/languages`);
                const techData = await techResponse.json();

                // Crie um elemento <div> para a tecnologia
                const projectLanguage = document.createElement('div');
                projectLanguage.classList.add('end');

                // Preencha o elemento de tecnologia com as informações da linguagem
                projectLanguage.innerHTML = `<img src="./assets/Ellipse 2.svg" alt="">`;

                for (const lang in techData) {
                    const techItem = document.createElement('strong');
                    techItem.textContent = lang;
                    projectLanguage.appendChild(techItem);                    
                }

                // Crie um elemento <div> para a seção de estrelas e forks
                const starsForksDiv = document.createElement('div');
                starsForksDiv.classList.add('group');

                // Consulte as informações do projeto no GitHub para obter as estrelas (stars) e forks
                const starsForksResponse = await fetch(`https://api.github.com/repos/gabrielv-oliveira/${project.name}`);
                const starsForksData = await starsForksResponse.json();

                // Crie um elemento <p> para as estrelas (stars)
                const projectStars = document.createElement('p');
                projectStars.innerHTML = `<img src="./assets/star.svg" alt=""><strong>${starsForksData.stargazers_count}</strong>`;

                // Crie um elemento <p> para os forks
                const projectForks = document.createElement('p');
                projectForks.innerHTML = `<img src="./assets/git-branch.svg" alt=""><strong>${starsForksData.forks_count}</strong>`;

                // Adicione as estrelas e os forks como filhos da seção de estrelas e forks
                starsForksDiv.appendChild(projectStars);
                starsForksDiv.appendChild(projectForks);

                // Adicione o título do projeto como filho do elemento <a>
                projectLink.appendChild(projectName);

                // Adicione o elemento <a> como filho do container de projeto
                projectDiv.appendChild(projectLink);

                // Adicione a descrição do projeto como filho do container de projeto
                projectDiv.appendChild(projectDescription);

                // Adicione as informações de tecnologia como filho da seção de tecnologias
                techDiv.appendChild(projectLanguage);

                // Adicione a seção de estrelas e forks como filho do container de projeto
                projectDiv.appendChild(starsForksDiv);

                // Adicione a seção de tecnologias como filho do container de projeto
                projectDiv.appendChild(techDiv);

                // Adicione o container de projeto ao container principal
                projectContainer.appendChild(projectDiv);
            });
        } else {
            console.error('Erro ao buscar projetos no GitHub:', data.message);
        }
    } catch (error) {
        console.error('Erro na solicitação ao GitHub:', error);
    }
}

// Chame a função para buscar e exibir os projetos
fetchGitHubProjects();
