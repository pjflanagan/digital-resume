import clsx from 'clsx';
import { useState, useRef } from 'react';

import { useBio } from 'src/content';
import type { FormPlaceholder } from 'src/content';
import { LabeledButton, ButtonHolder, TextAccent, TextTitle, Text } from 'src/elements';
import { Random } from 'src/helpers';
import { useReveal } from 'src/hooks';

import { ContactForm } from './contact-form/ContactForm';
import * as Style from './Card.module.scss';

type CardProps = {
  setIsWaveOn: (on: boolean) => void;
};

function Card({ setIsWaveOn }: CardProps) {
  const Bio = useBio();
  const ref = useRef<HTMLDivElement>(null);
  const isOpen = useReveal({ ref, gap: 420 });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [placeholders, setPlaceholders] = useState<FormPlaceholder>(() =>
    Random.fromArray(Bio.contact.formPlaceholders)
  );

  function cycleCharacter() {
    const currentIndex = Bio.contact.formPlaceholders.findIndex(
      (placeholder) => placeholder.name === placeholders.name
    );
    const nextIndex = (currentIndex + 1) % Bio.contact.formPlaceholders.length;
    setPlaceholders(Bio.contact.formPlaceholders[nextIndex]);
  }

  const className = clsx(Style.card, {
    [Style.rotated]: !isOpen,
    [Style.collapsed]: isSubmitted || !isOpen,
    [Style.isSubmitted]: isSubmitted,
  });

  return (
    <div className={className} ref={ref}>
      <div className={Style.cardSides}>
        <div className={Style.sideLeft}>
          <div className={Style.background}>
            <div className={clsx(Style.decoration, Style.topRectangle)} />
            <div className={clsx(Style.decoration, Style.bottomCircle)} />
            <div className={clsx(Style.decoration, Style.bottomCircleOuter)} />
            <div className={clsx(Style.decoration, Style.bottomRectangleOuter)} />
          </div>
          <TextAccent mono animate>
            {Bio.contact.accent}
          </TextAccent>
          <TextTitle className={Style.title} onClick={cycleCharacter}>
            {Bio.contact.title}
          </TextTitle>
          <Text>{Bio.contact.text}</Text>
          <div className={Style.linkHolder}>
            {Bio.contact.links.map((link) => (
              <ButtonHolder className={Style.buttonHolder} key={link.text}>
                <LabeledButton
                  icon={link.icon}
                  href={link.href}
                  onMouseEnter={() => setIsWaveOn(true)}
                  onMouseLeave={() => setIsWaveOn(false)}
                >
                  {link.text}
                </LabeledButton>
              </ButtonHolder>
            ))}
          </div>
        </div>
        <ContactForm
          setIsWaveOn={setIsWaveOn}
          isSubmitted={isSubmitted}
          setIsSubmitted={setIsSubmitted}
          placeholders={placeholders}
          setPlaceholders={setPlaceholders}
        />
      </div>
    </div>
  );
}

export { Card };
