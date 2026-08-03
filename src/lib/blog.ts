import fs from 'fs';
import path from 'path';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
}

const contentDir = path.join(process.cwd(), 'src/content/blog');

export function getBlogPosts(): BlogPost[] {
  if (!fs.existsSync(contentDir)) {
    return [];
  }
  
  const files = fs.readdirSync(contentDir);
  const posts: BlogPost[] = files.filter(f => f.endsWith('.md')).map(fileName => {
    const slug = fileName.replace('.md', '');
    const fullPath = path.join(contentDir, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // Very basic frontmatter parser (assuming standard layout)
    // Format expected:
    // ---
    // title: Something
    // date: YYYY-MM-DD
    // description: Blah blah
    // ---
    // Content...
    
    const lines = fileContents.split('\n');
    let inFrontmatter = false;
    let title = '';
    let date = '';
    let description = '';
    const contentLines: string[] = [];

    for (const line of lines) {
      if (line.trim() === '---') {
        inFrontmatter = !inFrontmatter;
        continue;
      }
      
      if (inFrontmatter) {
        if (line.startsWith('title:')) title = line.replace('title:', '').trim();
        if (line.startsWith('date:')) date = line.replace('date:', '').trim();
        if (line.startsWith('description:')) description = line.replace('description:', '').trim();
      } else {
        contentLines.push(line);
      }
    }

    return {
      slug,
      title,
      date,
      description,
      content: contentLines.join('\n').trim()
    };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getBlogPosts();
  return posts.find(post => post.slug === slug);
}
