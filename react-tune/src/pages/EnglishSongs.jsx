import PlayerPage from '../shared/PlayerPage'
import { englishSongsData } from '../shared/data'

export default function EnglishSongs(){
  return <PlayerPage title="International English Songs" songs={englishSongsData} />
}
