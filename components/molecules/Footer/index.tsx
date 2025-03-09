import { getDayjs } from '@/utils/date'
import { Github, Linkedin } from 'lucide-react'

export default async function Footer() {
  const year = getDayjs().year()
  const gitHubLink = 'https://github.com/xPedrol'
  const linkedInLink =
    'https://www.linkedin.com/in/pedro-lucas-santos-ferreira-79a032178/'
  const personalSite = 'https://xpedrol.vercel.app/'
  return (
    <footer className="absolute bottom-0 w-full bg-surface-a0 flex items-center mt-10">
      <div className="w-full flex justify-between items-center custom-contaier max-md:flex-col max-md:gap-6 py-5 border-primary-a20 border-t-[2px]">
        <div className="text-primary-a30">
          © {year} WiseWays. All rights reserved.
        </div>
        <ul className="flex items-center gap-6">
          <li>
            Feito por
            <a
              href={personalSite}
              target="_blank"
              className="text-primary-a30 hover:underline"
            >
              {' '}
              xPedroL
            </a>
          </li>
          <li>
            <a
              href={linkedInLink}
              target="_blank"
              className="text-primary-a30 hover:underline"
              title="Linkedin"
              aria-label="Linkedin"
            >
              <Linkedin size={24} />
            </a>
          </li>
          <li>
            <a
              href={gitHubLink}
              target="_blank"
              className="text-primary-a30 hover:underline"
              title="Github"
              aria-label="Github"
            >
              <Github size={24} />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
