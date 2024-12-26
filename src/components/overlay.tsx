import { Scroll, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";
import './overlay.scss'

/* eslint-disable @typescript-eslint/no-explicit-any */
const Section = (props: any) => {
    console.log(props)
    return (
        <section
            className={`section ${
                props.right ? "items-end" : "items-start"
            }`}
            style={{
                opacity: props.opacity,
            }}
        >
            <div className="background">
                <div className="background__full">
                    <div className="background__full__color">
                        {props.children}
                    </div>
                </div>
            </div>
        </section>
    );
};

export const Overlay = () => {
    const scroll = useScroll();
    const [opacityFirstSection, setOpacityFirstSection] = useState(1);
    const [opacitySecondSection, setOpacitySecondSection] = useState(1);
    const [opacityLastSection, setOpacityLastSection] = useState(1);

    useFrame(() => {
        setOpacityFirstSection(1 - scroll.range(0, 0.33));
        setOpacitySecondSection(scroll.curve(0.33, 0.33));
        setOpacityLastSection(scroll.range(0.66, 0.33));
    });

    return (
        <Scroll html>
            <div className="scroll">
                <Section opacity={opacityFirstSection}>
                    <h1 className="font-semibold">
                        Hello, I'm Wawa Sensei
                    </h1>
                    <p className="text-gray-500">Welcome to my beautiful portfolio</p>
                    <p className="mt-3">I know:</p>
                    <ul className="leading-9">
                        <li>🧑‍💻 How to code</li>
                        <li>🧑‍🏫 How to learn</li>
                        <li>📦 How to deliver</li>
                    </ul>
                    <p className="animate-bounce  mt-6">↓</p>
                </Section>
                <Section right opacity={opacitySecondSection}>
                    <h1 className="font-semibold font-serif text-2xl">
                        Here are my skillsets 🔥
                    </h1>
                    <p className="text-gray-500">PS: I never test</p>
                    <p className="mt-3">
                        <b>Frontend 🚀</b>
                    </p>
                    <ul className="leading-9">
                        <li>ReactJS</li>
                        <li>React Native</li>
                        <li>VueJS</li>
                        <li>Tailwind</li>
                    </ul>
                    <p className="mt-3">
                        <b>Backend 🔬</b>
                    </p>
                    <ul className="leading-9">
                        <li>NodeJS</li>
                        <li>tRPC</li>
                        <li>NestJS</li>
                        <li>PostgreSQL</li>
                    </ul>
                    <p className="animate-bounce  mt-6">↓</p>
                </Section>
                <Section opacity={opacityLastSection}>
                    <h1 className="font-semibold font-serif text-2xl">
                        🤙 Call me maybe?
                    </h1>
                    <p className="text-gray-500">
                        I'm very expensive but you won't regret it
                    </p>
                    <p className="mt-6 p-3 bg-slate-200 rounded-lg">
                        📞 <a href="tel:(+42) 4242-4242-424242">(+42) 4242-4242-424242</a>
                    </p>
                </Section>
            </div>
        </Scroll>
    );
};