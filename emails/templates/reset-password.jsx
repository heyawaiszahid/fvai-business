import { Body, Container, Head, Html, Link, Section, Tailwind, Text } from "@react-email/components";

export function ResetPasswordEmail({ resetLink }) {
  return (
    <Tailwind>
      <Html>
        <Head />
        <Body className="bg-white font-sans">
          <Container className="max-w-md mx-auto p-6">
            <Section>
              <Text className="text-base text-gray-700 mb-4">
                You requested a password reset for your FVAI Business account.
              </Text>
              <Text className="text-base text-gray-700 mb-4">Click the link below to set a new password:</Text>
              <Text className="text-base text-blue-600 underline mb-4">
                <Link href={resetLink}>{resetLink}</Link>
              </Text>
              <Text className="text-sm text-gray-500">
                This link will expire in 1 hour. If you didn't request this, you can safely ignore it.
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}
