const API_BASE = 'https://api-the-person-above.game-stats.workers.dev'

export type GameStats = {
  websiteVisits: string
  totalCompletions: string
  averageCompletionTime: string
}

/*
  Creates a visit session and records a website visit.

  Stores the returned session_id in sessionStorage so it can
  later be used when submitting a game completion.
*/
export async function createVisitSession(): Promise<string | null> {
  try {
    const res = await fetch(`${API_BASE}/visit`, {
      method: 'POST',
    })

    if (!res.ok) {
      throw new Error('Failed to create visit session')
    }

    const data = await res.json()

    sessionStorage.setItem('game_session_id', data.session_id)

    return data.session_id
  } catch (err) {
    console.error('createVisitSession failed', err)
    return null
  }
}

/*
  Ensures a visit is recorded once per browser session.
  Safe to call during application bootstrap.
*/
export async function ensureVisitSession(): Promise<void> {
  const existing = sessionStorage.getItem('game_session_id')

  if (!existing) {
    await createVisitSession()
  }
}

/*
  Records a completed game.

  durationSeconds should be the total runtime of the game.
*/
export async function recordGameCompletion(durationSeconds: number): Promise<void> {
  const sessionId = sessionStorage.getItem('game_session_id')

  if (!sessionId) {
    console.warn('No session id found, skipping completion record')
    return
  }

  try {
    await fetch(`${API_BASE}/beat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_id: sessionId,
        duration_seconds: durationSeconds,
      }),
    })
  } catch (err) {
    console.error('recordGameCompletion failed', err)
  }
}

/*
  Fetches stats for the About page.
*/
export async function fetchGameStats(): Promise<GameStats> {
  try {
    const res = await fetch(`${API_BASE}/stats`)

    if (!res.ok) {
      throw new Error('Failed to fetch stats')
    }

    const data = await res.json()

    const avgSeconds = data.average_completion_seconds ?? 0
    const avgMinutes = Math.round(avgSeconds / 60)

    return {
      websiteVisits: String(data.total_visits ?? 0),
      totalCompletions: String(data.total_beats ?? 0),
      averageCompletionTime: `${avgMinutes} minutes`,
    }
  } catch (err) {
    console.error('fetchGameStats failed', err)

    return {
      websiteVisits: '0',
      totalCompletions: '0',
      averageCompletionTime: '0 minutes',
    }
  }
}

/*
  Utility for debugging from browser console.
*/
export async function debugRecordBeat() {
  await recordGameCompletion(420)
}
