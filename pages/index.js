import React from "react";
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/OrcuteCommons';
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";

function ProfilesSideBar(propriedades){
  return(
    <Box as = "aside">
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

function ProfileRelationsBox(propriedades){
  return(
    <ProfileRelationsBoxWrapper>
      <h2 className = 'smallTitle'>
        {propriedades.title} ({propriedades.items.length})
      </h2>
      <ul>
        {/*followers.map((item) => {
          return(
            <li key = {item}>
              <a href = {`https://github.com/${item}.png`}>
                <img src = {item.image} />
                <span>{item.title}</span>
              </a>
            </li>
          )
        })*/}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const randomUser = 'FelipeMDantas';
  const [communities, setCommunities] = React.useState([]);
  const communityPeople = ['juunegreiros', 'omariosouto', 'peas', 'rafaballerini', 'marcobrunodev', 'felipefialho'];
  const [followers, setFollowers] = React.useState([]);
  React.useEffect(function(){
    fetch('https://api.github.com/users/peas/followers')
    .then(function(serverReturn){
      return serverReturn.json();
    })
    .then(function(entireReturn){
      setFollowers(entireReturn);
    })

    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': 'b2a0754f558320161be0f1fb179d69',
        'Content-Type': 'application/json',
        'Accept': 'application/json' 
      },
      body: JSON.stringify({ "query": `query {
        allCommunities {
          title
          id
          imageUrl
          creatorSlug
        }
      }`
      }) 
    })
    .then((response) => response.json())
    .then((entireReturn) => {
      const communitiesOriginatedFromDato = entireReturn.data.allCommunities;
      setCommunities(communitiesOriginatedFromDato);
    })
  }, [])

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
                imageUrl: formData.get('image'),
                creatorSlug: randomUser
              }

              fetch('/api/communities', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSOM.stringify(community)
              })
              .then(async(response) => {
                const data = await response.json();
                console.log(data);
              })

              //const updatedCommunities = [...communities, community];
              //setCommunities(updatedCommunities);
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
          <ProfileRelationsBox title = "Seguidores" items = {followers}/>
          <ProfileRelationsBoxWrapper>
            <h2 className = 'smallTitle'>
              Comunidades ({communities.length})
            </h2>
            <ul>
              {communities.map((item) => {
                return(
                  <li key = {item.id}>
                    <a href = {`/communities/${item.id}`}>
                      <img src = {item.imageUrl} />
                      <span>{item.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className = 'smallTitle'>
              Pessoas da comunidade Dev ({communityPeople.length})
            </h2>
            <ul>
              {communityPeople.map((item) => {
                return(
                  <li key = {item}>
                    <a href = {`/users/${item}`}>
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
