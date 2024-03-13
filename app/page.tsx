import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TabsDemo() {
  return (
    <Tabs defaultValue="chase" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="chase">Chase</TabsTrigger>
        <TabsTrigger value="tour">Tour</TabsTrigger>
        <TabsTrigger value="explore">Explore</TabsTrigger>
        <TabsTrigger value="extras">Extras</TabsTrigger>
      </TabsList>
      <TabsContent value="chase">
        <Card>
          <CardHeader>
            <CardTitle>Chase</CardTitle>
            <CardDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
              aut veritatis fugit amet incidunt obcaecati, laborum voluptatum
              odio totam aliquam nihil, consequuntur libero reprehenderit
              doloribus laudantium autem nam! Dignissimos cumque possimus
              explicabo sit temporibus! Maxime unde expedita non omnis
              architecto voluptate assumenda ad blanditiis sunt libero! Quam
              ipsa eaque quis!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            some card content here
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="tour">
        <Card>
          <CardHeader>
            <CardTitle>Tour</CardTitle>
            <CardDescription>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe
              atque amet repellendus dolorum cum, vel maiores quisquam,
              obcaecati, provident nostrum in possimus iste laboriosam! Impedit
              inventore alias laboriosam aut eveniet necessitatibus
              reprehenderit nobis omnis in? Error ipsa quasi temporibus quam.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            some card content here
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="explore">
        <Card>
          <CardHeader>
            <CardTitle>Explore</CardTitle>
            <CardDescription>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe
              atque amet repellendus dolorum cum, vel maiores quisquam,
              obcaecati, provident nostrum in possimus iste laboriosam! Impedit
              inventore alias laboriosam aut eveniet necessitatibus
              reprehenderit nobis omnis in? Error ipsa quasi temporibus quam.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            some card content here
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="extras">
        <Card>
          <CardHeader>
            <CardTitle>Extras</CardTitle>
            <CardDescription>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe
              atque amet repellendus dolorum cum, vel maiores quisquam,
              obcaecati, provident nostrum in possimus iste laboriosam! Impedit
              inventore alias laboriosam aut eveniet necessitatibus
              reprehenderit nobis omnis in? Error ipsa quasi temporibus quam.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            some card content here
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
