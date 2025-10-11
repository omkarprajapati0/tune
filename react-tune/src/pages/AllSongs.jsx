import PlayerPage from '../shared/PlayerPage'
import { allSongsData } from '../shared/data'

export default function AllSongs(){
  return <PlayerPage title="All Songs" songs={allSongsData} />
}
