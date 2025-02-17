import { auth } from "@/auth";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CiCircleCheck } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

import { BlurFade } from "@/components/magicUI/BlurFade";
import Footer from "@/components/Footer";
import HomeHeroButton from "@/components/HomeHeroButton";
import { Suspense } from "react";

const HomePage = async () => {
  const session = await auth();

  return (
    <div className=" flex  flex-col  items-center">
      <main className="text-center pt-32">
        {/* Title */}
        <h1 className="text-5xl font-bold flex flex-col gap-3 text-foreground mb-4">
          <span className="flex flex-row gap-2">
            <BlurFade delay={0}>Automate</BlurFade>
            <BlurFade delay={0.2}>your</BlurFade>
            <BlurFade delay={0.4}>productivity</BlurFade>
          </span>
          <BlurFade delay={0.6}>with GetItDone</BlurFade>
        </h1>

        {/* Subtitle */}
        <BlurFade delay={0.8}>
          <p className="text-lg text-foreground mb-8">
            No matter how many tasks you have, our app can help you manage them.
          </p>
        </BlurFade>

        {/* Call-to-Action button */}
        <BlurFade delay={0.8}>
          {session && (
            <Button variant="default" asChild>
              <Link
                href="/dashboard"
                className="flex flex-row items-center gap-2"
              >
                <span>Go to Dashboard</span>
              </Link>
            </Button>
          )}
          {!session && (
            <Suspense>
              <HomeHeroButton />
            </Suspense>
          )}

          <BlurFade delay={0.8}>
            {!session && (
              <p className="text-sm text-foreground mt-4">Try free</p>
            )}
          </BlurFade>
        </BlurFade>
      </main>

      {/* Features Section */}
      <BlurFade delay={0.9} inView>
        <section className=" w-full py-12 mt-12">
          <h2 className="text-3xl font-semibold text-foreground mb-8 text-center">
            Why Choose GetItDone?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 max-w-5xl mx-auto">
            <BlurFade delay={1}>
              <div className="p-6 bg-background shadow rounded-lg text-center">
                <CiCircleCheck
                  size={40}
                  className="text-blue-500 mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">Task Management</h3>
                <p className="text-foreground">
                  Easily organize and manage your tasks with intuitive controls.
                </p>
              </div>
            </BlurFade>
            <BlurFade delay={1.2}>
              <div className="p-6 bg-background shadow rounded-lg text-center">
                <CiCircleCheck
                  size={40}
                  className="text-blue-500 mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">Real-time Sync</h3>
                <p className="text-foreground">
                  Keep your tasks synced across devices for seamless
                  productivity.
                </p>
              </div>
            </BlurFade>
            <BlurFade delay={1.4}>
              <div className="p-6 bg-background shadow rounded-lg text-center">
                <CiCircleCheck
                  size={40}
                  className="text-blue-500 mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">Reminders</h3>
                <p className="text-foreground">
                  Set reminders and never miss an important deadline.
                </p>
              </div>
            </BlurFade>
          </div>
        </section>
      </BlurFade>

      <BlurFade delay={1.5}>
        <section className="w-full py-12 mt-12 bg-background">
          <h2 className="text-3xl font-semibold text-foreground mb-8 text-center">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 max-w-5xl mx-auto">
            <BlurFade delay={1.7}>
              <div className="p-6 shadow rounded-lg bg-background">
                <div className="flex items-center mb-4">
                  <FaStar size={24} className="text-yellow-400 mr-2" />
                  <FaStar size={24} className="text-yellow-400 mr-2" />
                  <FaStar size={24} className="text-yellow-400 mr-2" />
                  <FaStar size={24} className="text-yellow-400 mr-2" />
                  <FaStar size={24} className="text-yellow-400" />
                </div>
                <p className="text-foreground">
                  &quot;GetItDone has revolutionized the way I manage my daily
                  tasks. I feel more productive and organized.&quot;
                </p>
                <p className="mt-4 font-semibold text-foreground">- John Doe</p>
              </div>
            </BlurFade>
            <BlurFade delay={1.9}>
              <div className="p-6 shadow rounded-lg bg-background">
                <div className="flex items-center mb-4">
                  <FaStar size={24} className="text-yellow-400 mr-2" />
                  <FaStar size={24} className="text-yellow-400 mr-2" />
                  <FaStar size={24} className="text-yellow-400 mr-2" />
                  <FaStar size={24} className="text-yellow-400 mr-2" />
                  <FaStar size={24} className="text-yellow-400" />
                </div>
                <p className="text-foreground">
                  &quot;The real-time sync feature allows me to update my tasks
                  from anywhere, which is a game-changer for me.&quot;
                </p>
                <p className="mt-4 font-semibold text-foreground">
                  - Jane Smith
                </p>
              </div>
            </BlurFade>
          </div>
        </section>
      </BlurFade>

      {/* FAQ Section */}
      <BlurFade delay={2} className="w-2/4">
        <section className="w-full py-12 mt-12 ">
          <h2 className="text-3xl font-semibold text-foreground mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="w-full mx-auto px-4">
            <Accordion type="single" className="w-full" collapsible>
              {/* Question 1 */}
              <BlurFade delay={2.1}>
                <AccordionItem value="item-1" className="w-full">
                  <AccordionTrigger className="text-lg font-medium">
                    What is GetItDone?
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground">
                    GetItDone is a task management app designed to help you
                    manage your tasks and increase productivity.
                  </AccordionContent>
                </AccordionItem>
              </BlurFade>

              {/* Question 2 */}
              <BlurFade delay={2.2}>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-lg font-medium">
                    Is there a free trial available?
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground">
                    GetItDone is completely free to use with no trial period.
                  </AccordionContent>
                </AccordionItem>
              </BlurFade>

              {/* Question 3 */}
              <BlurFade delay={2.3}>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-lg font-medium">
                    Can I sync my tasks across devices?
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground">
                    No, GetItDone does not support real-time sync across devices
                    but in the future we will add this feature.
                  </AccordionContent>
                </AccordionItem>
              </BlurFade>

              {/* Question 4 */}
              <BlurFade delay={2.4}>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-lg font-medium">
                    How do I upgrade to a premium plan?
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground">
                    GetItDone does not have a premium plan at the moment.
                  </AccordionContent>
                </AccordionItem>
              </BlurFade>
            </Accordion>
          </div>
        </section>
      </BlurFade>
      <BlurFade className="w-full" delay={2.5}>
        <Footer />
      </BlurFade>
    </div>
  );
};

export default HomePage;
