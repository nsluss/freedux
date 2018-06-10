import daggy from 'daggy'
import { liftF } from 'freeky'
import Future from 'data.task'

export const FetchType = daggy.taggedSum('Fetch', { Fetch: ['url', 'opts'] })
const { Fetch } = FetchType

export const fetchF = (url, opts) => liftF(Fetch(url, opts))
export const fetchToFuture = f => f.cata({
  Fetch: (u, o) => new Future((rej, res) => fetch(u, o).then(r => r.json().then(res).catch(rej)))
})

