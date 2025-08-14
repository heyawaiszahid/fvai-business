import { Body, Container, Head, Html, Link, Section, Tailwind, Text } from "@react-email/components";

export function UploadLaterEmail({ uploadLink }) {
  return (
    <Tailwind>
      <Html>
        <Head />
        <Body className="bg-white font-sans">
          <Container className="max-w-md mx-auto p-6">
            <Section>
              <Text className="text-base text-gray-700 mb-4">
                You requested a link to upload files to your FVAI Business account at a later time.
              </Text>
              <Text className="text-base text-gray-700 mb-4">Use the link below when you're ready to upload:</Text>
              <Text className="text-base text-blue-600 underline mb-4">
                <Link href={uploadLink}>{uploadLink}</Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}
