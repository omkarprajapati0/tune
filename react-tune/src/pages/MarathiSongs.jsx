import PlayerPage from '../shared/PlayerPage'
import { marathiSongsData } from '../shared/data'

export default function MarathiSongs(){
  return <PlayerPage title="Marathi Songs" songs={marathiSongsData} />
}
