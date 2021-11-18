import MainGrid from "../src/components/MainGrid"
import Box from "../src/components/Box"
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/OrcuteCommons';
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";

function ProfilesSideBar(propriedades){
  return(
    <Box>
      <img src = {`https://github.com/${propriedades.githubUser}.png`} style = {{ borderRadius: '8px'}}></img>
    </Box>
  )
}

export default function Home() {
  const randomUser = 'FelipeMDantas'
  const communityPeople = ['juunegreiros', 'omariosouto', 'peas', 'rafaballerini', 'marcobrunodev', 'felipefialho']

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
        </div>
        <div className = "profileRelationsArea" style = {{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
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
