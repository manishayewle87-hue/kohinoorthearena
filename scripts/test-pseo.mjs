import { getPSEOPageData } from '../src/lib/pseo-data.ts';
import { getDomainConfig } from '../src/lib/domain-config.ts';

const data = getPSEOPageData('mahalaxmi-kohinoor-pimpri');
console.log('Data:', data);

const cfg = getDomainConfig('kohinoorthearena.in');
console.log('Cfg:', cfg.arenaName);
