import { Body, Container, Head, Html, Section, Tailwind, Text } from "@react-email/components";

export function WelcomeEmail({ email }) {
  return (
    <Tailwind>
      <Html>
        <Head />
        <Body className="bg-white font-sans">
          <Container className="max-w-md mx-auto p-6">
            <Section>
              <Text className="text-base text-gray-700">
                Thanks for joining FVAI Business — let's turn weeks of valuation into days.
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}
