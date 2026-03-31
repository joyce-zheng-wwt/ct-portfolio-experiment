import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// Serves index.html for any /experiments/<id>/ path.
// Static assets (style.css, script.js, etc.) are served directly
// from public/ by Next.js before this handler is ever reached.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params
  const filePath = path.join(process.cwd(), 'public', 'experiments', ...slug, 'index.html')

  try {
    const html = fs.readFileSync(filePath, 'utf-8')
    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  } catch {
    return new NextResponse('Not found', { status: 404 })
  }
}
