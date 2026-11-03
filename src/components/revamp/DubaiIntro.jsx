import { motion, useReducedMotion } from 'framer-motion';
import { CalendarDays, Plane, ShieldCheck, Wallet } from 'lucide-react';
import Kicker from './Kicker';
import SectionRule from './SectionRule';

const FACTS = [
  { icon: CalendarDays, label: 'Best months', value: 'Nov – Mar' },
  { icon: Plane, label: 'Flight time', value: '3–4 hrs from Delhi' },
  { icon: Wallet, label: 'Typical budget', value: '₹55k – ₹1.2L pp' },
  { icon: ShieldCheck, label: 'Visa', value: '3–5 working days' },
];

const SPRING = { type: 'spring', stiffness: 300, damping: 25, mass: 0.8 };

export default function DubaiIntro() {
  const reduceMotion = useReducedMotion();

  // Transform is dropped entirely under reduced motion — a plain fade still
  // sequences the block without anything travelling across the screen.
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0.04 : 0.09, delayChildren: 0.08 } },
  };
  const item = reduceMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.2 } } }
    : { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: SPRING } };

  return (
    <section className="pt-9 md:pt-12 lg:pt-14 pb-2 bg-transparent">
      <div className="container-custom max-w-4xl">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div variants={item}>
            <Kicker className="mb-3 block">Why Dubai</Kicker>
          </motion.div>

          <motion.div variants={item}>
            <SectionRule className="mb-4" />
          </motion.div>

          <motion.h2
            variants={item}
            className="font-poppins font-bold text-h2 text-brand-ink leading-tight"
          >
            The perfect first international family holiday
          </motion.h2>

          <div className="mt-4 space-y-2.5 text-brand-muted-ink font-canva-sans text-sm md:text-base leading-relaxed">
            <motion.p variants={item}>
              Just 3–4 hours from most Indian cities. Veg &amp; Jain food everywhere, Hindi widely spoken, and visa filed as part of your package.
            </motion.p>
            <motion.p variants={item}>
              ₹55k–₹1.2L per person for 4–5 nights — flights, 4-star hotel, transfers and top attractions included. Fixed price, zero surprises.
            </motion.p>
          </div>

          <motion.dl variants={item} className="mt-5 grid grid-cols-2 gap-2.5 md:gap-3">
            {FACTS.map(({ icon: Icon, label, value }) => (
              // Icon beside the text rather than stacked above it — same information
              // in roughly half the height, so the facts don't dominate the column.
              // A <dl> group may only hold <dt>/<dd>, so the icon lives inside the <dt>,
              // absolutely positioned into the left padding (14px + 36px icon + 12px gap).
              <div
                key={label}
                className="relative flex min-h-[60px] min-w-0 flex-col justify-center rounded-2xl border border-brand-hairline bg-surface py-3 pl-[62px] pr-3.5"
              >
                <dt className="text-[10px] font-poppins font-semibold uppercase tracking-widest text-brand-muted-ink">
                  <span
                    aria-hidden="true"
                    className="absolute left-3.5 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl bg-brand-orange/10"
                  >
                    <Icon className="h-[18px] w-[18px] text-brand-orange" />
                  </span>
                  {label}
                </dt>
                <dd className="mt-0.5 font-poppins font-bold text-sm md:text-[15px] text-brand-ink leading-snug">{value}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

      </div>
    </section>
  );
}
