import React from "react";
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/OrcuteCommons';
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";

function ProfilesSideBar(propriedades){
  return(
    <Box>
      <img src = {`https://github.com/${propriedades.githubUser}.png`} style = {{ borderRadius: '8px'}}></img>
      <hr />
      <p>
        <a className = "boxLink" src = {`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home() {
  const randomUser = 'FelipeMDantas';
  const [communities, setCommunities] = React.useState([{
    title: 'Eu odeio acordar cedo',
    image: 'https://pbs.twimg.com/profile_images/143696361/avatar_400x400.jpg',
  }]);
  console.log(communities);
  const communityPeople = ['juunegreiros', 'omariosouto', 'peas', 'rafaballerini', 'marcobrunodev', 'felipefialho'];

  return (
    <>
      <AlurakutMenu></AlurakutMenu>
      <MainGrid>
        <div className = "profileArea" style = {{ gridArea: 'profileArea' }}>
          <ProfilesSideBar githubUser = {randomUser}></ProfilesSideBar>
        </div>
        <div className = "welcomeArea" style = {{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className = 'title'>
              Bem-vindo(a)
            </h1>
            <OrkutNostalgicIconSet></OrkutNostalgicIconSet>
          </Box>
          <Box>
            <h2 className = "subTitle">O que você deseja fazer?</h2>
            <form onSubmit = {function handleCommunityCreation(e){
              e.preventDefault();
              const formData = new FormData(e.target);
              console.log('Field: ', formData.get('title'));
              console.log('Field: ', formData.get('image'));
              const community = {
                title: formData.get('title'),
                image: formData.get('image'),
              }
              const updatedCommunities = [...communities, 'Alura Stars'];
              setCommunities(updatedCommunities);
            }}>
              <div>
                <input
                  placeholder = "Qual vai ser o nome da sua comunidade?"
                  name = "title"
                  aria-label = "Qual var ser o nome da sua comunidade?"
                  type = "text"
                />
              </div>
              <div>
                <input
                  placeholder = "Coloque uma URL para usarmos de capa"
                  name = "image"
                  aria-label = "Coloque uma URL para usarmos de capa"
                />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className = "profileRelationsArea" style = {{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <ProfileRelationsBoxWrapper>
              <ul>
                {communities.map((item) => {
                  return(
                    <li>
                      <a href = {`/users/${item.title}`} key = {item.title}>
                        <img src = {item.image} />
                        <span>{item.title}</span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </ProfileRelationsBoxWrapper>
            <h2 className = 'smallTitle'>
              Pessoas da comunidade Dev ({communityPeople.length})
            </h2>
            <ul>
              {communityPeople.map((item) => {
                return(
                  <li>
                    <a href = {`/users/${item}`} key = {item}>
                      <img src = {`https://github.com/${item}.png`}/>
                      <span>{item}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div> 
      </MainGrid>
    </>
  )
}
