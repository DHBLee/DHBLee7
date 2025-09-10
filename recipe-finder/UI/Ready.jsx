import Image from "next/image";
import Button from "./Button";

export default function Ready() {
    return (
        <section className="rounded-[10px] relative flex flex-col items-center gap-[16px] mt-[64px] md:mt-[80px] lg:mt-0 py-[48px] md:py-[80px] lg:py-[96px] bg-Neutral200">
            <h2 className="text-preset2 text-Neutral900 text-center">Ready to cook smarter?</h2>
            <p className="text-preset6 text-Neutral800 text-center">Hit the button, pick a recipe, and get dinner on the table—fast.</p>
            <Button extraStyles="mt-[16px] px-[32px] py-[16px] leading-[140%] text-[18px] font-bold" href="/recipes">
              Browse recipes
            </Button>


            <Image src="/assets/images/pattern-fork.svg" width={100} height={100} className="w-[20%] hidden md:block absolute bottom-0 left-0" alt="Pattern Fork" />
            <Image src="/assets/images/pattern-knife.svg" width={100} height={100} className="w-[20%] hidden md:block absolute top-0 right-0" alt="Pattern Knife" />
          </section>
    );
}