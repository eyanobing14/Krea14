# Copywriting Skill (voix humaine, FR/EN)

## Mission

Écrire le contenu du site (FR principal, EN miroir) comme le ferait le designer lui-même, pas comme une IA qui remplit une page. Le texte doit être précis, vérifiable, et impossible à publier tel quel par un concurrent sans que ça sonne faux.

Ce skill s'applique au copy marketing et éditorial : hero, titres de section, descriptions de services, cartes de case study, pages contact et légales, labels d'interface.

---

## Méthode en 3 passes

1. **Repérer les tics.** Passer chaque phrase au crible des listes ci-dessous et marquer ce qui trahit une génération automatique.
2. **Réécrire en concret.** Garder le fait, jeter la signification qui l'accompagne. Nommer la chose, le lieu, le chiffre, l'outil.
3. **Relire à voix haute.** Si une phrase ne se dit pas naturellement à l'oral, elle est fausse. Si le texte pourrait décrire n'importe quel studio, il est vide.

---

## Signes d'IA à supprimer

### Construction
- **« Ce n'est pas X, c'est Y »** (et variantes « il ne s'agit pas seulement de X, il s'agit de Y », « plus qu'un X, un Y »). Supprimer la mise en scène, garder l'information.
- **Le triptyque systématique.** L'IA pense par trois. Utiliser deux, quatre ou un seul élément quand c'est ce que le sens demande.
- **La chute dramatique.** Une phrase courte isolée en fin de paragraphe pour faire profond (« L'apprentissage devient un sport. »). Couper si elle ne fait que répéter.
- **L'amorce inutile.** « Plongeons dans », « Explorons », « Imaginez un monde où », « À l'ère du numérique », « Dans un monde où ».
- **La question que personne ne pose.** « Et si je vous disais que… ». Argumenter contre une objection que le lecteur n'a pas formulée.
- **Le rythme mécanique.** Trois phrases de même longueur d'affilée, la même ouverture répétée en début de paragraphe, un paragraphe qui finit toujours par une transition.

### Lexique
- **Mots creux français :** incontournable, robuste, actionnable, solution clé en main, sur-mesure (sans description), sans couture, sans friction, frustration (au sens marketing), délivrer de la valeur, adresser un problème, naviguer dans, tirer parti de, exploit (au sens figuré), synergie, écosystème (pour dire « outils »), passionné, mémorable, élégant, intuitif, qui raconte une histoire, au centre de chaque décision, de bout en bout, à 360°, sur-mesure.
- **Expressions toutes faites :** « il convient de noter », « force est de constater », « au final », « en définitive », « dans les plus brefs délais », « n'hésitez pas à ».
- **Anglicismes et calques :** pixel-perfect, game-changer, seamless, « qui marque », « laisser une trace », « expériences numériques ». Dire « maquettes », « temps de chargement », « mise en ligne ».
- **Superlatifs non mesurés :** incroyable, exceptionnel, révolutionnaire, incomparable. Un chiffre ou un fait remplace l'adjectif.

### Ponctuation
- Pas de tiret cadratin (—) ni demi-cadratin (–) : préférer virgule, deux-points, point ou parenthèses. La phrase française s'en passe.
- Un point d'exclamation maximum par page. Aucun point de suspension dans les textes marketing.
- Pas de majuscule décorative au milieu d'une phrase, pas de gras de décoration.

### Format
- Pas de titre redondant avec sa première phrase. Pas de gras tous les deux mots.
- Pas de mention du document lui-même (« cette section présente », « dans cet article »).
- Pas de paragraphes qui commencent par « Pour ce faire », « De plus », « En outre ».

---

## Ce qu'il faut faire à la place

- **Dire directement l'action et l'objet.** « Nous concevons des identités visuelles » et non « Nous créons des expériences qui marquent ».
- **Vérifier chaque affirmation.** Si un chiffre n'est pas dans `public/data/portfolio.json` ou dans le code, il ne s'écrit pas. Pas d'anecdote inventée, pas de témoignage fabriqué.
- **Assumer le « nous » du site.** Le portfolio parle au pluriel (nous) même pour une personne : garder cette voix, ne pas basculer en « je » ou en « on » sans décision explicite.
- **Assumer le flou quand il existe.** Phrase comme « même s'il n'est pas encore cadré » font plus humaines qu'une fausse confiance.
- **Donner un ordre de grandeur utile.** « 24 h ouvrées » vaut mieux que « dès que possible ».
- **Terminer par la conséquence concrète**, pas par une clause d'ambiance.

---

## Règles spécifiques au site

- **FR d'abord.** La version française est la source. L'anglais est un miroir fidèle, jamais une reformulation plus « marketing ».
- **Synchronisation obligatoire.** Toute chaîne FR visible doit avoir sa traduction : soit dans `public/data/portfolio.json` (champs `*En`), soit dans `src/translations.ts` (clé = texte FR normalisé), soit en attribut `data-en` dans le composant. Un texte FR modifié sans traduction casse le toggle FR/EN.
- **Ton.** À plat, précis, un peu sec. Aucune flatterie du client ni de soi-même.
- **Longueur.** Hero : deux phrases maximum. Description de section : une phrase. Description de service : deux phrases.
- **Vocabulaire du projet :** design graphique, identité visuelle, UI/UX, wireframe, prototype, frontend, Astro, React, Tailwind, TypeScript, GSAP, mise en ligne, temps de chargement, accessibilité.

---

## Checklist avant de livrer

1. Une phrase pourrait-elle décrire n'importe quel autre studio ? → la rendre spécifique ou la supprimer.
2. Reste-t-il un tic de la liste (triptyque, « ce n'est pas X c'est Y », point final dramatique) ? → réécrire.
3. Chaque affirmation est-elle vérifiable dans le projet ? → sinon, la retirer.
4. Toutes les chaînes FR modifiées ont-elles leur équivalent EN ? → sinon, compléter.
5. Le texte se lit-il à voix haute sans que j'aie envie de lever les yeux au ciel ? → sinon, recommencer.
6. Zéro tiret cadratin, zéro « passionné », zéro « mémorable », zéro « qui raconte une histoire ».

---

## Sources

Adapté de `blader/humanizer` (méthode d'édition et inventaire des tics, inspiré des « Signs of AI writing » de Wikipédia), de `jalaalrd/anti-ai-slop-writing` (checklist finale et ponctuation) et de `MrBridgeHQ/human-writer-fr` (tics propres au français : cadratins, tricolons, calques). Version condensée et francisée pour ce portfolio.
